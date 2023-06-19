// ChatRoom.tsx
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { io, Socket } from "socket.io-client";

interface Params {
    [key: string]: string | undefined;
}

interface Message {
    user: string;
    text: string;
  }

const ChatRoom = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const { id } = useParams<Params>();
  const { name } = useLocation().state;

  useEffect(() => {
    const newSocket = io(`http://localhost:8000`);
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit("join", {roomId: id, name});

      socket.on("message", (messageObj: Message) => {
        setMessages((messages) => [...messages, messageObj]);
      });
    }
  }, [socket, id]);

  const sendMessage = () => {
    if (socket) {
      socket.emit("message", { roomId: id, message });
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Sala de chat: {id}</h1>
      <div>
        {messages.map((messageObj, index) => (
            <p key={index}><b>{messageObj.user}:</b> {messageObj.text}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Enviar mensagem</button>
    </div>
  );
};

export default ChatRoom;
