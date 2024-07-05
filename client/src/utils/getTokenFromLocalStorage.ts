function getTokenFromLocalStorage(): string | null {
    return localStorage.getItem('token');
}

export default getTokenFromLocalStorage;