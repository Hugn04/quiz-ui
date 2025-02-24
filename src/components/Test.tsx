import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addConversation, addMessage, setSelectConversation } from '../redux/slices/conversationSlice';
import { RootState, AppDispatch } from '../redux/store';

const Chat = () => {
    const dispatch = useDispatch<AppDispatch>();
    const conversations = useSelector((state: RootState) => state.conversation.conversations);
    const selectedConversation = useSelector((state: RootState) => state.conversation.selectedConversation);
    const [message, setMessage] = useState('');

    useEffect(() => {
        dispatch(addConversation({ id: '1', name: 'Chat với Bot', messages: [] }));
    }, [dispatch]);
    const handleSendMessage = () => {
        if (selectedConversation && message.trim()) {
            dispatch(
                addMessage({
                    conversationId: selectedConversation.id,
                    message: {
                        id: new Date().toISOString(),
                        text: message,
                        sender: 'user',
                    },
                }),
            );
            setMessage('');
        }
    };

    return (
        <div>
            <h2>Danh sách cuộc hội thoại</h2>
            <ul>
                {conversations.map((c) => (
                    <li key={c.id} onClick={() => dispatch(selectConversation(c.id))}>
                        {c.name}
                    </li>
                ))}
            </ul>

            {selectedConversation && (
                <div>
                    <h3>Cuộc hội thoại: {selectedConversation.name}</h3>
                    <div>
                        {selectedConversation.messages.map((msg) => (
                            <p key={msg.id}>
                                <strong>{msg.sender}:</strong> {msg.text}
                            </p>
                        ))}
                    </div>
                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Nhập tin nhắn..."
                    />
                    <button onClick={handleSendMessage}>Gửi</button>
                </div>
            )}
        </div>
    );
};

export default Chat;
