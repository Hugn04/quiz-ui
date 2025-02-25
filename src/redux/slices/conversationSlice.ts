import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import request from '../../api/request';

export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
}

export interface Conversation {
    _id: string;
    name: string;
    messages: Message[];
    lastMessage: string;
}

export interface ConversationState {
    conversations: Conversation[];
    selectedConversation: Conversation[];
    groupSelectConversation: Conversation[];
    numberSelect: number;
}

const initialState: ConversationState = {
    conversations: [],
    selectedConversation: [],
    groupSelectConversation: [],
    numberSelect: 0,
};
export const fetchMessageByConversationId = createAsyncThunk('message/getMessage', async (conversationId: string) => {
    const response = await request.get('/get-message', { params: { id: conversationId } });
    return { conversationId: conversationId, messages: response.data };
});
const conversationSlice = createSlice({
    name: 'conversation',
    initialState,
    reducers: {
        getAllConversation: (state, action: PayloadAction<Conversation[]>) => {
            state.conversations = action.payload;
        },
        addConversation: (state, action: PayloadAction<Conversation>) => {
            state.conversations.push(action.payload);
        },
        addConversationToGroup: (state, action: PayloadAction<string>) => {
            const conversation: Conversation | undefined = state.conversations.find((c) => c._id === action.payload);

            if (conversation && !state.groupSelectConversation.some((c) => c._id === conversation._id)) {
                const lenSelect = state.groupSelectConversation.length;
                if (lenSelect >= 5) {
                    state.groupSelectConversation.shift();
                }
                state.numberSelect = state.groupSelectConversation.push(conversation);
            }
        },

        setSelectConversation: (state, action: PayloadAction<string>) => {
            const conversation: Conversation | undefined = state.conversations.find((c) => c._id === action.payload);

            if (conversation && !state.selectedConversation.some((c) => c._id === conversation._id)) {
                const lenSelect = state.selectedConversation.length;
                if (lenSelect >= 2) {
                    state.selectedConversation.shift();
                }
                state.selectedConversation.push(conversation);
            }
        },
        removeSelected: (state, action: PayloadAction<string>) => {
            state.selectedConversation = state.selectedConversation.filter((c) => c._id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(
            fetchMessageByConversationId.fulfilled,
            (state, action: PayloadAction<{ conversationId: string; messages: Message[] }>) => {
                const conversation = state.conversations.find((c) => c._id === action.payload.conversationId);
                const selectedConversation = state.selectedConversation.find(
                    (c) => c._id === action.payload.conversationId,
                );
                const groupSelectConversation = state.groupSelectConversation.find(
                    (c) => c._id === action.payload.conversationId,
                );
                if (conversation && selectedConversation && groupSelectConversation) {
                    selectedConversation.messages = action.payload.messages;
                    conversation.messages = action.payload.messages;
                    groupSelectConversation.messages = action.payload.messages;
                }
            },
        );
    },
});

export const { addConversation, setSelectConversation, removeSelected, getAllConversation, addConversationToGroup } =
    conversationSlice.actions;
export default conversationSlice.reducer;
