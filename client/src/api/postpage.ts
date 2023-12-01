import { IPostpage } from '@/interfaces/postpage';
import { pause } from '@/utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const postpageApi = createApi({
    reducerPath: "posts",
    tagTypes: ['posts'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/',
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        getPostpages: builder.query<any[], void>({
            query: () => `/posts`,
            providesTags: ['posts'],
            transformResponse: (response: any) => {
                console.log(response);

                return response.map((item: any) => ({
                    ...item,
                    id: item.id
                }));
            },
        }),

        getPostpageById: builder.query<IPostpage, number | string>({
            query: (id) => `/posts/${id}`,
            providesTags: ['posts'],
            // transformResponse: (response: any) => ({
            //     ...response.data.attributes,
            //     id: response.data.id
            // }),
        }),

        removePostpage: builder.mutation<void, number | string>({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['posts'],
        }),

        addPostpage: builder.mutation<IPostpage, Partial<IPostpage>>({
            query: (Users) => ({
                url: '/posts',
                method: 'POST',
                body: Users
            }),
            invalidatesTags: ['posts'],
        }),

        updatePostpage: builder.mutation<IPostpage, Partial<IPostpage>>({
            query: (user) => ({
                url: `/postpage/${user.id}`,
                method: "PATCH",
                body: user
            }),
            invalidatesTags: ['posts'],
        }),
    })
});

export const {
    useGetPostpagesQuery,
    useAddPostpageMutation,
    useGetPostpageByIdQuery,
    useRemovePostpageMutation,
    useUpdatePostpageMutation,
} = postpageApi;

export const PostpageReducer = postpageApi.reducer;
export default postpageApi;