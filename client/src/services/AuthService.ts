import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthResponse } from '../models/response/AuthResponse';
import setTokenToLocalStorage from '../utils/setTokenToLocalStorage';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5001/api/',
        credentials: 'include',
    }),

    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, { email: string; password: string }>({
            query: (data) => ({
                url: `login`,
                method: 'POST',
                body: data,
            }),
            transformResponse: (response: AuthResponse) => {
                setTokenToLocalStorage(response.accessToken);
                return response;
            },
        }),
        registration: builder.mutation<AuthResponse, { email: string; password: string }>({
            query: (data) => ({
                url: `registration`,
                method: 'POST',
                body: data,
            }),
            transformResponse: (response: AuthResponse) => {
                setTokenToLocalStorage(response.accessToken);
                return response;
            },
        }),
        logout: builder.mutation<void, void>({
            query: (data) => ({
                url: `logout`,
                method: 'POST',
                body: data,
            }),
            transformResponse: () => {
                setTokenToLocalStorage(null);
            },
        }),
        checkAuth: builder.query<AuthResponse, void>({
            query: () => ({
                url: `refresh`,
            }),
            transformResponse: (response: AuthResponse) => {
                setTokenToLocalStorage(response.accessToken);
                return response;
            },
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegistrationMutation,
    useLazyCheckAuthQuery,
    useCheckAuthQuery,
} = authApi;
