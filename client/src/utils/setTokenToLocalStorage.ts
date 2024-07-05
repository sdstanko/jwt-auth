function setTokenToLocalStorage(token: string | null): void {

    if (token) {
        localStorage.setItem('token', token);
    } else {
        localStorage.removeItem('token');
    }
}

export default setTokenToLocalStorage;
