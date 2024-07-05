import React, { useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import { useLazyCheckAuthQuery, useCheckAuthQuery } from './services/AuthService';
import { useLazyGetUsersQuery } from './services/UserService';
import getTokenFromLocalStorage from './utils/getTokenFromLocalStorage';
import { useAppSelector } from './store/hooks';
import { useDispatch } from 'react-redux';
import { setUser } from './store/user/userSlice';

function App() {
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const [checkAuth, { data, isSuccess, isLoading }] = useLazyCheckAuthQuery();
    const [getUsers, { data: users }] = useLazyGetUsersQuery();
    const dispatch = useDispatch();
    const user = useAppSelector((state) => state.user);

    const token = getTokenFromLocalStorage();

    useEffect(() => {
        if (token) {
            checkAuth();
            setIsAuthChecked(true);
        } else {
            setIsAuthChecked(true);
        }
    }, []);

    useEffect(() => {
        if (isSuccess && data) {
            dispatch(setUser({ ...data.user, isAuth: true }));
        }
    }, [isLoading]);

    const getUsersHandler = async () => {
        try {
            getUsers();
        } catch (e) {
            console.log(e);
        }
    };

    if (!isAuthChecked || isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="App">
            <h1>{user.isAuth ? `Authorized user ${user.email}` : 'Please login'}</h1>
            <h2>
                {user && user.isActivated
                    ? 'Account verified by mail'
                    : 'Please verify your mail by letter we sent you'}
            </h2>
            <LoginForm />
            <div>
                <button onClick={() => getUsersHandler()}>Get users</button>
            </div>
            {users && users.map((user, i) => <div key={i}>{user.email}</div>)}
        </div>
    );
}

export default App;
