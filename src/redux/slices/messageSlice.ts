import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import request from '../../api/request';

import type { User } from './userSlice';

export interface Message {
    id: string;
    content: string;
    senderId: User;
    createdAt: string;
}

export interface Messages {
    conversationId: string;
    messages: Message[];
}

export interface MessageState {
    messages: Messages[];
}

const initialState: MessageState = {
    messages: [],
};

export const fetchMessageByConversationId = createAsyncThunk('message/getMessage', async (conversationId: string) => {
    const response = await request.get('/get-message', { params: { id: conversationId } });
    return { conversationId: conversationId, messages: response.data };
});

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        addMessages: (state, action: PayloadAction<{ conversationId: string; messages: Message[] }>) => {
            const message = state.messages.find((c) => c.conversationId === action.payload.conversationId);
            if (message) {
                message.messages = [...action.payload.messages, ...message.messages];
            } else {
                state.messages.push({
                    conversationId: action.payload.conversationId,
                    messages: action.payload.messages,
                });
            }
        },
        addMessage: (state, action: PayloadAction<{ conversationId: string; message: Message }>) => {
            const message = state.messages.find((c) => c.conversationId === action.payload.conversationId);
            if (message) {
                message.messages.push(action.payload.message);
            }
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(
            fetchMessageByConversationId.fulfilled,
            (state, action: PayloadAction<{ conversationId: string; messages: Message[] }>) => {
                // Add user to the state array
                state.messages.push({
                    conversationId: action.payload.conversationId,
                    messages: action.payload.messages,
                });
            },
        );
    },
});

export const { addMessages, addMessage } = messageSlice.actions;
export default messageSlice.reducer;
