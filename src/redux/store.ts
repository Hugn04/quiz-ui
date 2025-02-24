import { configureStore } from '@reduxjs/toolkit';
import conversationReducer from './slices/conversationSlice';
import messageReducer from './slices/messageSlice';

export const store = configureStore({
    reducer: {
        conversation: conversationReducer,
        message: messageReducer,
    },
});

// Định nghĩa kiểu RootState và AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
