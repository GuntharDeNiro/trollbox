// ChatComponent.js
import React, { useState, useEffect } from 'react';
import './ChatComponent.css';
import io from 'socket.io-client';

let socket;

function ChatComponent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [minimized, setMinimized] = useState(true);
  const [nickname, setNickname] = useState('');
  const [nicknameConfirmed, setNicknameConfirmed] = useState(false);

  useEffect(() => {
    socket = io('http://localhost:3000');

    socket.on('receive message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    }
  }, []);

  const sendMessage = () => {
    socket.emit('send message', {
      nickname: nickname,
      message: input
    });
    setInput('');
  }


  const toggleMinimize = () => {
    setMinimized(!minimized);
  }

  // Within the ChatComponent's return statement:
  // Within the ChatComponent's return statement:
  return (
    <div className={`chat-container ${minimized ? 'minimized' : 'maximized'}`}>
      <div className="chat-header" onClick={toggleMinimize}>
        Support Chat
    </div>
      {!nicknameConfirmed ? (
        <div className="nickname-section">
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && nickname) {
                setNicknameConfirmed(true);
              }
            }}
            placeholder="Enter your nickname"
          />

          <button onClick={() => { if (nickname) setNicknameConfirmed(true); }}>
            Join Chat
        </button>
        </div>
      ) : (
        <>
          <div className="chat-messages">
            {messages.map((msg, idx) => <p key={idx}><strong>{msg.nickname}:</strong> {msg.message}</p>)}
          </div>
          <div className="chat-input-section">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && input.trim()) {
                  sendMessage();
                }
              }}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </>
      )}
    </div>
  );


}

export default ChatComponent;
