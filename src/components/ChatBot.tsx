import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import naviGif from "../assets/navi.gif";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hey there! I'm here to answer any questions you have about Rocky. What would you like to know?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    inputRef.current?.focus();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/.netlify/functions/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: messages,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Sorry, something went wrong. Please try again." },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn't connect. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div style={styles.chatWindow}>
          <div style={styles.header}>
            <span style={styles.headerTitle}>Chat with me</span>
            <button onClick={() => setIsOpen(false)} style={styles.closeButton}>
              ✕
            </button>
          </div>

          <div style={styles.messagesContainer}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  ...styles.message,
                  ...(msg.role === "user" ? styles.userMessage : styles.assistantMessage),
                }}
              >
                {msg.role === "assistant" ? (
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                ) : (
                  msg.content
                )}
              </div>
            ))}
            {isLoading && (
              <div style={{ ...styles.message, ...styles.assistantMessage }}>
                <span style={styles.typing}>Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={styles.inputContainer}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              style={styles.input}
              disabled={isLoading}
            />
            <button onClick={sendMessage} style={styles.sendButton} disabled={isLoading}>
              Send
            </button>
          </div>
        </div>
      )}

      {/* Speech Bubble */}
      {showBubble && !isOpen && (
        <div style={styles.speechBubble} onClick={() => { setShowBubble(false); setIsOpen(true); }}>
          Hey, listen!
        </div>
      )}

      {/* Floating Chat Button */}
      <button onClick={() => { setShowBubble(false); setIsOpen(!isOpen); }} style={styles.floatingButton}>
        {isOpen ? "✕" : <img src={naviGif} alt="Chat" style={{ height: "50px" }} />}
      </button>
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  floatingButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: "white",
    color: "#333",
    border: "none",
    cursor: "pointer",
    fontSize: "24px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  speechBubble: {
    position: "fixed",
    bottom: "85px",
    right: "100px",
    backgroundColor: "white",
    color: "#333",
    padding: "8px 12px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    fontSize: "14px",
    fontWeight: "bold",
    zIndex: 1000,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  chatWindow: {
    position: "fixed",
    bottom: "110px",
    right: "20px",
    width: "min(350px, calc(100vw - 40px))",
    height: "min(550px, calc(100vh - 150px))",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    zIndex: 999,
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#2196F3",
    color: "white",
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: "16px",
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
  },
  messagesContainer: {
    flex: 1,
    overflowY: "auto",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  message: {
    padding: "10px 14px",
    borderRadius: "12px",
    maxWidth: "80%",
    wordWrap: "break-word",
    fontSize: "14px",
    lineHeight: "1.4",
  },
  userMessage: {
    backgroundColor: "#2196F3",
    color: "white",
    alignSelf: "flex-end",
    borderBottomRightRadius: "4px",
  },
  assistantMessage: {
    backgroundColor: "#f0f0f0",
    color: "#333",
    alignSelf: "flex-start",
    borderBottomLeftRadius: "4px",
  },
  typing: {
    fontStyle: "italic",
    color: "#888",
  },
  inputContainer: {
    display: "flex",
    padding: "10px",
    borderTop: "1px solid #eee",
    gap: "8px",
  },
  input: {
    flex: 1,
    padding: "10px 12px",
    borderRadius: "20px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "14px",
  },
  sendButton: {
    padding: "10px 20px",
    borderRadius: "20px",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default ChatBot;
