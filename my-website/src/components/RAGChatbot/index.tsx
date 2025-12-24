import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';

interface Message {
  text: string;
  isUser: boolean;
}

const RAGChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ text: 'Hello! How can I help you today?', isUser: false }]);
  }, []);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isLoading) return;

    const userMessage: Message = { text: inputValue, isUser: true };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('https://moin-robo-robotics-backend.hf.space/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: inputValue,
          selected_text: null,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const botMessage: Message = { text: data.answer, isUser: false };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      const errorMessage: Message = { text: 'Sorry, something went wrong. Please try again.', isUser: false };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className={styles.chatbotContainer}>
      <div className={styles.chatWindow} ref={chatWindowRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${styles.message} ${message.isUser ? styles.userMessage : styles.botMessage}`}
          >
            {message.text}
          </div>
        ))}
        {isLoading && (
          <div className={`${styles.message} ${styles.botMessage}`}>
            <div className={styles.loadingDots}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>
      <div className={styles.inputArea}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className={styles.inputBox}
          disabled={isLoading}
        />
        <button onClick={handleSendMessage} className={styles.sendButton} disabled={isLoading}>
          Send
        </button>
      </div>
    </div>
  );
};

export default RAGChatbot;