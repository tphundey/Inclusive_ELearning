import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAll, add, get } from '../../api/productApi';

const initialState = {
    items: [],
    current: {}
};
export const fetchProduct = createAsyncThunk(
    'product/fetchProduct', async () => {
        try {
            const { data } = await getAll();
            return data
        } catch (error) {
            return error.response.data
        }
    }
)
export const fetchProductById = createAsyncThunk(
    'product/fetchProductById', async (id) => {
        try {
            const { data } = await get(id);
            return data
        } catch (error) {
            return error.response.data
        }
    }
)
export const addProduct = createAsyncThunk(
    'product/addProduct', async (product, { rejectWithValue }) => {
        try {
            const { data } = await add(product);
            return data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchProduct.pending, (state) => {

        });
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.items = action.payload
        });
        builder.addCase(fetchProduct.rejected, (state) => {

        });

        builder.addCase(fetchProductById.fulfilled, (state, action) => {
            state.current = action.payload
        });
    }
});
export default productSlice.reducer;