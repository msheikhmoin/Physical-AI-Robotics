import os
import glob
from dotenv import load_dotenv
import cohere
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct

# .env file se keys load karna
load_dotenv()

# Setup Clients (Yeh aapki .env se keys uthayega)
co = cohere.Client(os.getenv("COHERE_API_KEY"))
qdrant = QdrantClient(
    url=os.getenv("QDRANT_URL"), 
    api_key=os.getenv("QDRANT_API_KEY")
)

COLLECTION_NAME = "physical-ai-book"

def start_ingestion():
    print("Database connection check kar raha hoon...")
    
    # 1. Purani collection delete karke nayi banana
    try:
        qdrant.recreate_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(size=1024, distance=Distance.COSINE),
        )
        print(f"Collection '{COLLECTION_NAME}' created successfully.")
    except Exception as e:
        print(f"Error creating collection: {e}")
        return

    # 2. Markdown Files dhoondna (Aapke specs folder se)
    # Hum 'specs' folder se data uthayenge jahan architecture.md wagera hain
    files = glob.glob("specs/**/*.md", recursive=True)
    
    if not files:
        print("Koi .md files nahi mili! Check karein ke folder ka naam 'specs' hi hai.")
        return

    print(f"Total {len(files)} files mili hain. Processing shuru...")

    for file_path in files:
        with open(file_path, 'r', encoding='utf-8') as f:
            text = f.read()
            if len(text.strip()) < 10: continue # Khali files skip karein
            
            # Text ko chote chunks mein torna
            chunks = [text[i:i+1000] for i in range(0, len(text), 1000)]
            
            try:
                # 3. Embeddings banana (Cohere ke zariye)
                embeddings = co.embed(
                    texts=chunks,
                    model="embed-english-v3.0",
                    input_type="search_document"
                ).embeddings

                # 4. Qdrant mein points upload karna
                points = [
                    PointStruct(
                        id=hash(file_path + str(i)) % 10**10, 
                        vector=embeddings[i], 
                        payload={"text": chunks[i], "source": file_path}
                    ) for i in range(len(chunks))
                ]
                qdrant.upsert(collection_name=COLLECTION_NAME, points=points)
                print(f"✅ Uploaded {len(chunks)} chunks from: {file_path}")
            except Exception as e:
                print(f"❌ Error uploading {file_path}: {e}")

if __name__ == "__main__":
    start_ingestion()
    print("\n--- Ingestion Mukammal Ho Gayi! ---")