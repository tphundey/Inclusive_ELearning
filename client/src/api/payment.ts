import { Icategory } from '@/interfaces/category';
import { IProduct } from '@/interfaces/product';
import { Irole } from '@/interfaces/role';
import { Ivideo } from '@/interfaces/video';
import { pause } from '@/utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const PaymentApi = createApi({
    reducerPath: "payment",
    tagTypes: ['payment'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        getPayments: builder.query<any[], void>({
            query: () => `/payment`,
            providesTags: ['payment'],
            transformResponse: (response: any) => {
                console.log(response);
    
                // Đảo ngược mảng dữ liệu
                const reversedData = response.reverse();
    
                return reversedData.map((item: any) => ({
                    ...item,
                    id: item.id
                }));
            },
        }),

        getPaymentById: builder.query<Irole, number | string>({
            query: (id) => `/payment/${id}`,
            providesTags: ['payment'],
        }),
    })
});

export const {
    useGetPaymentsQuery,
    useGetPaymentByIdQuery,

} = PaymentApi;

export const PaymentReducer = PaymentApi.reducer;
export default PaymentApi;
