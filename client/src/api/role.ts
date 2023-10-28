import { Icategory } from '@/interfaces/category';
import { IProduct } from '@/interfaces/product';
import { Irole } from '@/interfaces/role';
import { Ivideo } from '@/interfaces/video';
import { pause } from '@/utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const roleApi = createApi({
    reducerPath: "Role",
    tagTypes: ['Role'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        getRoles: builder.query<any[], void>({
            query: () => `/Role`,
            providesTags: ['Role'],
            transformResponse: (response: any) => {
                console.log(response);

                return response.map((item: any) => ({
                    ...item,
                    id: item.id
                }));
            },
        }),

        getRoleById: builder.query<Irole, number | string>({
            query: (id) => `/Role/${id}`,
            providesTags: ['Role'],
            // transformResponse: (response: any) => ({
            //     ...response.data.attributes,
            //     id: response.data.id
            // }),
        }),

        removeRole: builder.mutation<void, number | string>({
            query: (id) => ({
                url: `/Role/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Role'],
        }),

        addRole: builder.mutation<Irole, Partial<Irole>>({
            query: (role) => ({
                url: '/Role',
                method: 'POST',
                body: role
            }),
            invalidatesTags: ['Role'],
        }),

        updateRole: builder.mutation<Irole, Partial<Irole>>({
            query: (role) => ({
                url: `/Role/${role.id}`,
                method: "PATCH",
                body: role
            }),
            invalidatesTags: ['Role'],
        }),
    })
});

export const {
    useGetRolesQuery,
    useAddRoleMutation,
    useGetRoleByIdQuery,
    useRemoveRoleMutation,
    useUpdateRoleMutation,
} = roleApi;

export const RoleReducer = roleApi.reducer;
export default roleApi;
