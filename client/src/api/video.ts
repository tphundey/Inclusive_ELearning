import { Icategory } from '@/interfaces/category';
import { IProduct } from '@/interfaces/product';
import { Ivideo } from '@/interfaces/video';
import { pause } from '@/utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const videoApi = createApi({
    reducerPath: "Videos",
    tagTypes: ['Videos'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        getVideos: builder.query<any[], void>({
            query: () => `/Videos`,
            providesTags: ['Videos'],
            transformResponse: (response: any) => {
                console.log(response);
                const reversedResponse = response.reverse();
                return reversedResponse.map((item: any) => ({
                    ...item,
                    id: item.id
                }));
            },
        }),


        getVideoById: builder.query<Ivideo, number | string>({
            query: (id) => `/Videos/${id}`,
            providesTags: ['Videos'],
            // transformResponse: (response: any) => ({
            //     ...response.data.attributes,
            //     id: response.data.id
            // }),
        }),

        removeVideo: builder.mutation<void, number | string>({
            query: (id) => ({
                url: `/Videos/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Videos'],
        }),

        addVideo: builder.mutation<Ivideo, Partial<Ivideo>>({
            query: (Courses) => ({
                url: '/Videos',
                method: 'POST',
                body: Courses
            }),
            invalidatesTags: ['Videos'],
        }),

        updateVideo: builder.mutation<Ivideo, Partial<Ivideo>>({
            query: (Courses) => ({
                url: `/Videos/${Courses.id}`,
                method: "PATCH",
                body: Courses
            }),
            invalidatesTags: ['Videos'],
        }),
    })
});

export const {
    useGetVideosQuery,
    useAddVideoMutation,
    useGetVideoByIdQuery,
    useRemoveVideoMutation,
    useUpdateVideoMutation,
} = videoApi;

export const videoReducer = videoApi.reducer;
export default videoApi;
