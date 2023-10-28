import { Icategory } from '@/interfaces/category';
import { IProduct } from '@/interfaces/product';
import { Iuser } from '@/interfaces/user';
import { Ivideo } from '@/interfaces/video';
import { pause } from '@/utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
    reducerPath: "users",
    tagTypes: ['users'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        getUsers: builder.query<any[], void>({
            query: () => `/users`,
            providesTags: ['users'],
            transformResponse: (response: any) => {
                console.log(response);

                return response.map((item: any) => ({
                    ...item,
                    id: item.id
                }));
            },
        }),

        getUserById: builder.query<Iuser, number | string>({
            query: (id) => `/users/${id}`,
            providesTags: ['users'],
            // transformResponse: (response: any) => ({
            //     ...response.data.attributes,
            //     id: response.data.id
            // }),
        }),

        removeUser: builder.mutation<void, number | string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['users'],
        }),

        addUser: builder.mutation<Iuser, Partial<Iuser>>({
            query: (Users) => ({
                url: '/users',
                method: 'POST',
                body: Users
            }),
            invalidatesTags: ['users'],
        }),

        updateUser: builder.mutation<Iuser, Partial<Iuser>>({
            query: (user) => ({
                url: `/users/${user.id}`,
                method: "PATCH",
                body: user
            }),
            invalidatesTags: ['users'],
        }),
    })
});

export const {
    useGetUsersQuery,
    useAddUserMutation,
    useGetUserByIdQuery,
    useRemoveUserMutation,
    useUpdateUserMutation,
} = userApi;

export const UserReducer = userApi.reducer;
export default userApi;
