export interface IAuthContext {
    isAuthenticated: boolean,
    setIsAuthenticated: (status: boolean) => void,
    authToken: string,
    updateAuthToken: (token: string) => void,
}
