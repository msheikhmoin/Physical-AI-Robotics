/**
 * RAGChatbot/index.tsx
 *
 * The main component for the RAG (Retrieval-Augmented Generation) Chatbot UI.
 * It manages state for chat messages, loading status, and user input.
 * It handles communication with the backend FastAPI service.
 */
import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';

// --- Type Definitions ---
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

const API_ENDPOINT = "https://moin-robo-robotics-backend.hf.space/chat";

/**
 * A loading indicator component to show while waiting for the bot's response.
 */
const LoadingIndicator = () => (
    <div className={`${styles.message} ${styles.botMessage} ${styles.loadingIndicator}`}>
        <div className={styles.loadingDots}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
);

/**
 * The main Chatbot component.
 */
const RAGChatbot: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const chatPanelRef = useRef<HTMLDivElement>(null);

    // Automatically scroll to the bottom of the chat panel when new messages are added.
    useEffect(() => {
        if (chatPanelRef.current) {
            chatPanelRef.current.scrollTop = chatPanelRef.current.scrollHeight;
        }
    }, [messages, isLoading]);
    
    // Add a welcome message on component mount.
    useEffect(() => {
        setMessages([
            {
                id: Date.now(),
                text: "Hello! Ask me a question about the content of the book.",
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString()
            }
        ]);
    }, []);

    /**
     * Handles sending the user's message to the backend API.
     */
    const handleSendMessage = async () => {
        const trimmedInput = input.trim();
        if (!trimmedInput) return;

        const userMessage: Message = {
            id: Date.now(),
            text: trimmedInput,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString(),
        };

        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // Check for selected text on the page
            const selection = window.getSelection();
            const selected_text = selection ? selection.toString().trim() : null;

            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question: trimmedInput,
                    selected_text: selected_text,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const data = await response.json();
            
            const botMessage: Message = {
                id: Date.now() + 1, // Ensure unique ID
                text: data.answer,
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString(),
            };
            setMessages(prevMessages => [...prevMessages, botMessage]);

        } catch (error) {
            console.error("Error fetching chat response:", error); // Added for debugging
            const errorMessage: Message = {
                id: Date.now() + 1,
                text: 'Sorry, something went wrong. Please try again.',
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString(),
            };
            setMessages(prevMessages => [...prevMessages, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.chatContainer}>
            {/* Panel to display chat messages */}
            <div className={styles.chatPanel} ref={chatPanelRef}>
                {messages.map((msg) => (
                    <div key={msg.id} className={`${styles.message} ${msg.sender === 'user' ? styles.userMessage : styles.botMessage}`}>
                        <div className={styles.messageSender}>{msg.sender === 'user' ? 'You' : 'Bot'}</div>
                        <div className={styles.messageText}>{msg.text}</div>
                        <div className={styles.messageTimestamp}>{msg.timestamp}</div>
                    </div>
                ))}
                {isLoading && <LoadingIndicator />}
            </div>

            {/* Input area for the user */}
            <div className={styles.inputArea}>
                <textarea
                    className={styles.textInput}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                        }
                    }}
                    placeholder="Type your message..."
                    rows={1}
                />
                <button
                    className={styles.submitButton}
                    onClick={handleSendMessage}
                    disabled={isLoading || !input.trim()}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default RAGChatbot;
