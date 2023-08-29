import { IProduct } from '@/interfaces/product';
import { pause } from '@/utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const productApi = createApi({
    reducerPath: "product",
    tagTypes: ['Product'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:1337/api',
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<IProduct[], void>({
            query: () => `/products`,
            providesTags: ['Product'],
            transformResponse: (response: any) => {
                return response.data.map((item: any) => ({
                    name: item.attributes.name,
                    price: item.attributes.price.toString(),
                    id: item.id,
                }));
            },
        }),

        getProductById: builder.query<IProduct, number | string>({
            query: (id) => `/products/${id}`,
            providesTags: ['Product'],
            transformResponse: (response: any) => ({
                name: response.data.attributes.name,
                price: response.data.attributes.price.toString(),
                id: response.data.id,
            }),
        }),

        removeProduct: builder.mutation<void, number | string>({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        }),

        addProduct: builder.mutation<IProduct, Partial<IProduct>>({
            query: (product) => ({
                url: '/products',
                method: 'POST',
                body: {
                    data: product // Đảm bảo gửi dữ liệu trong đối tượng "data"
                },
            }),
            invalidatesTags: ['Product'],
        }),

        updateProduct: builder.mutation<IProduct, Partial<IProduct>>({
            query: (product) => ({
                url: `/products/${product.id}`,
                method: 'PUT',
                body: {
                    data: product // Đảm bảo gửi dữ liệu trong đối tượng "data"
                },
            }),
            invalidatesTags: ['Product'],
        }),
    })
});

export const {
    useGetProductsQuery,
    useAddProductMutation,
    useGetProductByIdQuery,
    useRemoveProductMutation,
    useUpdateProductMutation
} = productApi;

export const productReducer = productApi.reducer;
export default productApi;
