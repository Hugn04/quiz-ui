import { configureStore } from '@reduxjs/toolkit';
import conversationReducer from './slices/conversationSlice';
import messageReducer from './slices/messageSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
    reducer: {
        conversation: conversationReducer,
        message: messageReducer,
        user: userReducer,
    },
});

// Định nghĩa kiểu RootState và AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
