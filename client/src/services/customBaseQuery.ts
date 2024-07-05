import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getTokenFromLocalStorage from '../utils/getTokenFromLocalStorage';
import { clearUser } from '../store/user/userSlice';
import { AuthResponse } from '../models/response/AuthResponse';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5001/api/',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getTokenFromLocalStorage();
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});



const customBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions,
) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        const refreshResult = await baseQuery(
            {
                url: 'refresh',
            },
            api,
            extraOptions,
        );

        if (refreshResult.data) {
            const newToken = (refreshResult.data as AuthResponse).accessToken;
            localStorage.setItem('token', newToken);
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(clearUser());
        }
    }

    return result;
};

export default customBaseQuery;
