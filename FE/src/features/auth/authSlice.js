import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signin, signup } from '../../api/authApi';


export const signIn = createAsyncThunk(
    'auth/signin',
    async (userData) => {
        const { data } = await signin(userData)
        return data
    }
)
export const signUp = createAsyncThunk(
    'auth/signup',
    async (userData) => {
        const { data } = await signup(userData)
        return data
    }
)
const authSlice = createSlice({
    name: 'auth',
    initialState: { current: {}, isAuthenticated: false, loading: false },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signIn.pending, (state, action) => {

        })
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.current = action.payload
        })
        builder.addCase(signIn.rejected, (state, action) => {

        });
    }
});

export default authSlice.reducer