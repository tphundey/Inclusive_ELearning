import { IProduct } from '@/interfaces/product';
import { pause } from '@/utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const productApi = createApi({
    reducerPath: "courses",
    tagTypes: ['Courses'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<any[], void>({
            query: () => `/Courses`,
            providesTags: ['Courses'],
            transformResponse: (response: any) => {
                console.log(response);

                return response.map((item: any) => ({
                    ...item,
                    id: item.id
                }));
            },
        }),

        getProductById: builder.query<IProduct, number | string>({
            query: (id) => `/Courses/${id}`,
            providesTags: ['Courses'],
            // transformResponse: (response: any) => ({
            //     ...response.data.attributes,
            //     id: response.data.id
            // }),
        }),

        addProduct: builder.mutation<IProduct, Partial<IProduct>>({
            query: (Courses) => ({
                url: '/Courses',
                method: 'POST',
                body: Courses
            }),
            invalidatesTags: ['Courses'],
        }),

        updateProduct: builder.mutation<IProduct, Partial<IProduct>>({
            query: (courses) => ({
                url: `/Courses/${courses.id}`,
                method: 'PATCH',
                body: courses 
            }),
            invalidatesTags: ['Courses'],
        }),
        
        hideProduct: builder.mutation<IProduct, number | string>({
            query: (id) => ({
                url: `/Courses/${id}/hide`,
                method: 'PATCH', // Hoặc phương thức HTTP tương ứng
            }),
            invalidatesTags: ['Courses'],
        }),

        // Thêm API endpoint để khôi phục khóa học
        restoreProduct: builder.mutation<IProduct, number | string>({
            query: (id) => ({
                url: `/Courses/${id}/restore`,
                method: 'PATCH', // Hoặc phương thức HTTP tương ứng
            }),
            invalidatesTags: ['Courses'],
        }),
    })
});

export const {
    useGetProductsQuery,
    useAddProductMutation,
    useGetProductByIdQuery,
    useUpdateProductMutation,
    useRestoreProductMutation,
    useHideProductMutation,
} = productApi;

export const productReducer = productApi.reducer;
export default productApi;
