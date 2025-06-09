import "./Chatbot.css"; 
import React, { useEffect, useState } from "react";
function Chatbot({src,transcript}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
useEffect(()=>{
   setMessages([]);
   setInput("");

  },[src])
  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    console.log("andu pandu : ",transcript);
const transcriptText = typeof transcript === "string" ? transcript : JSON.stringify(transcript);

const combinedMessage = input + " answer above question using the transcript only if question is related to transcript: in simple words" + transcriptText;

    try {
      const response = await fetch("http://localhost:4000/api/v1/chatbot/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: combinedMessage}),
      });
      const data = await response.json();
      setMessages([...newMessages, { from: "bot", text: data.reply }]);
    } catch (err) {
      setMessages([...newMessages, { from: "bot", text: "Error: Try again later." }]);
    }
  };

  return (
    
     <div className="chatbot-container">
      <h2>Ask Questions about Video</h2>

      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message ${msg.from === "user" ? "user-msg" : "bot-msg"}`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      <div className="chat-input-container">
        <input
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask something..."
        />
        <button className="send-button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
