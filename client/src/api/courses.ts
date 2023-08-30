import { IProduct } from '@/interfaces/product';
import { pause } from '@/utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const productApi = createApi({
    reducerPath: "courses",
    tagTypes: ['Courses'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:1337/api',
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<IProduct[], void>({
            query: () => `/courses`,
            providesTags: ['Courses'],
            transformResponse: (response: any) => {
                return response.data.map((item: any) => ({
                    instructor: item.attributes.instructor,
                    id: item.id,
                    title: item.attributes.title,
                    price: item.attributes.price,
                    duration: item.attributes.duration,
                    category: item.attributes.category,
                    level: item.attributes.level,
                    enrollments: item.attributes.enrollments,
                    publishedDate: item.attributes.publishedDate,
                    lastUpdated: item.attributes.lastUpdated,
                    createdAt: item.attributes.createdAt,
                    updatedAt: item.attributes.updatedAt,
                    publishedAt: item.attributes.publishedAt,
                    imageurl: item.attributes.imageurl,
                }));
            },
        }),

        getProductById: builder.query<IProduct, number | string>({
            query: (id) => `/products/${id}`,
            providesTags: ['Courses'],
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
            invalidatesTags: ['Courses'],
        }),

        addProduct: builder.mutation<IProduct, Partial<IProduct>>({
            query: (product) => ({
                url: '/products',
                method: 'POST',
                body: {
                    data: product // Đảm bảo gửi dữ liệu trong đối tượng "data"
                },
            }),
            invalidatesTags: ['Courses'],
        }),

        updateProduct: builder.mutation<IProduct, Partial<IProduct>>({
            query: (product) => ({
                url: `/products/${product.id}`,
                method: 'PUT',
                body: {
                    data: product // Đảm bảo gửi dữ liệu trong đối tượng "data"
                },
            }),
            invalidatesTags: ['Courses'],
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
