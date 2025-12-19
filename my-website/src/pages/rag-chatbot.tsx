/**
 * /src/pages/rag-chatbot.tsx
 *
 * This file creates a new page in the Docusaurus site at the `/rag-chatbot` route.
 * It uses the main Layout component to ensure consistent site styling and
 * renders the RAGChatbot component.
 */
import React from 'react';
import Layout from '@theme/Layout';
import RAGChatbot from '../components/RAGChatbot';
import Head from '@docusaurus/Head';

export default function ChatbotPage() {
  return (
    <Layout title="RAG Chatbot" description="An AI-powered chatbot to answer questions about the book.">
      <Head>
        {/* You can add custom <meta> tags or other head content here if needed */}
      </Head>
      <main style={{ padding: '2rem 0' }}>
        <RAGChatbot />
      </main>
    </Layout>
  );
}
