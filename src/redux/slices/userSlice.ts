import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import request from '../../api/request';

export interface User {
    _id: string;
    username: string;
}
interface UserState {
    user: User | null;
    isLoading: boolean;
    isError: boolean;
}
const initialState: UserState = {
    user: null,
    isLoading: false,
    isError: false,
};
export const login = createAsyncThunk('user/login', async (user: { username: string; password: string }) => {
    const response = await request.post('/login', { username: user.username, password: user.password });
    return response.data;
});
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
                state.isLoading = false;

                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
