import { createApi } from '@reduxjs/toolkit/query/react';
import { IUser } from '../models/response/IUser';
import getTokenFromLocalStorage from '../utils/getTokenFromLocalStorage';
import customBaseQuery from './customBaseQuery';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: customBaseQuery,

    endpoints: (builder) => ({
        getUsers: builder.query<IUser[], void>({
            query: () => ({
                url: `users`,
                // headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
            }),
        }),
    }),
});

export const { useLazyGetUsersQuery } = userApi;
