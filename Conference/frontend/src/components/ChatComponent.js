// ChatComponent.js

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const ChatComponent = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const socket = io('http://localhost:5001'); // Connect to the server

    useEffect(() => {
        // Listen for incoming messages from the server
        socket.on('message', (data) => {
            setMessages([...messages, data]);
        });
    
        // return () => {
        //     // Cleanup function to disconnect socket when component unmounts
        //     socket.disconnect();
        // };
    }, [messages, socket]); // Include 'socket' in the dependency array
    

    const sendMessage = () => {
        // Send a message to the server
        socket.emit('message', newMessage);
        setNewMessage('');
    };

    return (
        <div>
            <h1>Chat App</h1>
            <div>
                {messages.map((message, index) => (
                    <div key={index}>{message}</div>
                ))}
            </div>
            <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatComponent;
