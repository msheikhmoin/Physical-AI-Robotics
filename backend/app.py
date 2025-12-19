import os
import cohere
import traceback
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from qdrant_client import QdrantClient

load_dotenv()

# Initialize Clients
co_client = cohere.ClientV2(os.getenv("COHERE_API_KEY")) # Using ClientV2
q_client = QdrantClient(url=os.getenv("QDRANT_URL"), api_key=os.getenv("QDRANT_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    question: str
    selected_text: str | None = None

class ChatResponse(BaseModel):
    answer: str

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        documents = []
        if request.selected_text:
            documents.append(request.selected_text)
        else:
            # 1. Get Embedding (Using standard Client for embedding if V2 varies)
            legacy_co = cohere.Client(os.getenv("COHERE_API_KEY"))
            query_emb = legacy_co.embed(
                texts=[request.question],
                model="embed-english-v3.0",
                input_type="search_query"
            ).embeddings[0]

            # 2. Search Qdrant
            search_res = q_client.query_points(
                collection_name="physical-ai-book",
                query=query_emb,
                limit=5
            ).points
            
            print(f"Search results found: {len(search_res)}")
            for pt in search_res:
                txt = pt.payload.get("text") or pt.payload.get("content") or ""
                if txt: documents.append(txt)

        if not documents:
            return ChatResponse(answer="I could not find this information in the book.")

        # 3. Use Chat V2 with 'command-r-08-2024'
        context_str = "\n\n".join(documents)
        prompt = f"Context:\n{context_str}\n\nQuestion: {request.question}\n\nAnswer based ONLY on the context above."
        
        response = co_client.chat(
            model="command-r-08-2024", 
            messages=[{"role": "user", "content": prompt}]
        )
        
        return ChatResponse(answer=response.message.content[0].text)

    except Exception as e:
        print("--- FINAL DEBUG LOG ---")
        print(traceback.format_exc())
        return ChatResponse(answer="An error occurred. Please check the terminal.")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)