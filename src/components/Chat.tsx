import { useEffect, useState } from 'react';
import { useSocket } from '../hooks/useSocket';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<string[]>([]);
    const { socket, isConnected } = useSocket('chat:message', (newMessage) => {
        setMessages((prev) => [...prev, newMessage]);
    });
    useSocket('message', (e) => {
        console.log(e);
    });
    useEffect(() => {
        socket.emit('join-room', '67b098a37a82123e006b3ccc');
    }, [socket]);
    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('chat:message', message);
            setMessage('');
        }
    };

    return (
        <div>
            <h2>Chat Room</h2>
            <p>Trạng thái kết nối: {isConnected ? '🟢 Online' : '🔴 Offline'}</p>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Nhập tin nhắn..."
            />
            <button onClick={sendMessage}>Gửi</button>
        </div>
    );
};

export default Chat;
