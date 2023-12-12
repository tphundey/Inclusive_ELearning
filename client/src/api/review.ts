import { pause } from '@/utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const reviewApi = createApi({
    reducerPath: "reviews",
    tagTypes: ['reviews'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        getReviews: builder.query<any[], void>({
            query: () => `/reviews`,
            providesTags: ['reviews'],
            transformResponse: (response: any) => {
                console.log(response);

                return response.map((item: any) => ({
                    ...item,
                    id: item.id
                }));
            },
        }),
        removeReview: builder.mutation<void, number | string>({
            query: (id) => ({
                url: `/reviews/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['reviews'],
        }),
    })
});

export const {
    useGetReviewsQuery,
    useRemoveReviewMutation,
} = reviewApi;

export const reviewReducer = reviewApi.reducer;
export default reviewApi;
