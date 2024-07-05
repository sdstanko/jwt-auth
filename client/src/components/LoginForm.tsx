import React, { FC, useState, useEffect } from 'react';
import {
    useLoginMutation,
    useLogoutMutation,
    useRegistrationMutation,
} from '../services/AuthService';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, setUser } from '../store/user/userSlice';
import authHandler from '../utils/authHandler';
import { useAppSelector } from '../store/hooks';

const LoginForm: FC = () => {
    const dispatch = useDispatch();
    const user = useAppSelector((state) => state.user);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [login, { data: loginData, isSuccess: loginSuccess }] = useLoginMutation();
    const [registration, { data: registrationData, isSuccess: registrationSuccess }] =
        useRegistrationMutation();
    const [logout, { isSuccess: logoutSuccess }] = useLogoutMutation();

    useEffect(() => {
        if (loginSuccess && loginData) {
            dispatch(setUser({ ...loginData.user, isAuth: true }));
        } else if (registrationSuccess && registrationData) {
            dispatch(setUser({ ...registrationData.user, isAuth: true }));
        } else if (logoutSuccess) {
            dispatch(clearUser());
        }
    }, [loginSuccess, loginData, registrationSuccess, registrationData, logoutSuccess]);

    return (
        <div>
            {!user.isAuth ? (
                <>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="text"
                        placeholder="Email"
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        placeholder="Password"
                    />
                    <button onClick={() => authHandler(() => login({ email, password }).unwrap())}>
                        Login
                    </button>
                    <button
                        onClick={() =>
                            authHandler(() => registration({ email, password }).unwrap())
                        }
                    >
                        Registration
                    </button>
                </>
            ) : (
                <button onClick={() => authHandler(() => logout().unwrap())}>Logout</button>
            )}
        </div>
    );
};

export default LoginForm;
