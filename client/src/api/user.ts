import { Icategory } from '@/interfaces/category';
import { IProduct } from '@/interfaces/product';
import { ILogin, Iuser } from '@/interfaces/user';
import { Ivideo } from '@/interfaces/video';
import { pause } from '@/utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import instance from "./instance";
import { AxiosError } from 'axios';
const userApi = createApi({
    reducerPath: "user",
    tagTypes: ['googleAccount'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/',
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        getUsers: builder.query<any[], void>({
            query: () => `/googleAccount`,
            providesTags: ['googleAccount'],
            transformResponse: (response: any) => {
                console.log(response);
                const reversedResponse = response.reverse();
                return reversedResponse.map((item: any) => ({
                    ...item,
                    id: item.id
                }));
            },
        }),

        getUserById: builder.query<Iuser, number | string>({
            query: (id) => `/googleAccount/${id}`,
            providesTags: ['googleAccount'],
            // transformResponse: (response: any) => ({
            //     ...response.data.attributes,
            //     id: response.data.id
            // }),
        }),

        removeUser: builder.mutation<void, number | string>({
            query: (id) => ({
                url: `/googleAccount/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['googleAccount'],
        }),

        addUser: builder.mutation<Iuser, Partial<Iuser>>({
            query: (Users) => ({
                url: '/googleAccount',
                method: 'POST',
                body: Users
            }),
            invalidatesTags: ['googleAccount'],
        }),

        updateUser: builder.mutation<Iuser, Partial<Iuser>>({
            query: (user) => ({
                url: `/googleAccount/${user.id}`,
                method: "PATCH",
                body: user
            }),
            invalidatesTags: ['googleAccount'],
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
export const loginUser = async (user: ILogin) => {
    try {
        const response = await instance.post("/login", user)
        if (response.status === 200) {
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            return true;
        }
    } catch (error: unknown) {
        if (error instanceof AxiosError && error.response && error.response.status === 400) {
            throw new Error(error.response.data.message);
        } else {
            console.log(error);
            throw new Error('Đã xảy ra lỗi khi đăng nhập!');
        }
    }
};