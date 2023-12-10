import { Icategory } from '@/interfaces/category';
import { pause } from '@/utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const categoryApi = createApi({
    reducerPath: "Categories",
    tagTypes: ['Categories'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        getCategorys: builder.query<any[], void>({
            query: () => `/Categories`,
            providesTags: ['Categories'],
            transformResponse: (response: any) => {
                const reversedResponse = response.reverse();
                return reversedResponse.map((item: any) => ({
                    ...item,
                    id: item.id
                }));
            },
        }),

        getCategoryById: builder.query<Icategory, number | string>({
            query: (id) => `/Categories/${id}`,
            providesTags: ['Categories'],
            // transformResponse: (response: any) => ({
            //     ...response.data.attributes,
            //     id: response.data.id
            // }),
        }),

        removeCategory: builder.mutation<void, number | string>({
            query: (id) => ({
                url: `/Categories/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Categories'],
        }),

        addCategory: builder.mutation<Icategory, Partial<Icategory>>({
            query: (Courses) => ({
                url: '/Categories',
                method: 'POST',
                body: Courses
            }),
            invalidatesTags: ['Categories'],
        }),

        updateCategory: builder.mutation<Icategory, Partial<Icategory>>({
            query: (category) => ({
                url: `/Categories/${category.id}`,
                method: "PATCH",
                body: category
            }),
            invalidatesTags: ['Categories'],
        }),
    })
});

export const {
    useGetCategorysQuery,
    useAddCategoryMutation,
    useGetCategoryByIdQuery,
    useRemoveCategoryMutation,
    useUpdateCategoryMutation,
} = categoryApi;

export const categoryReducer = categoryApi.reducer;
export default categoryApi;
