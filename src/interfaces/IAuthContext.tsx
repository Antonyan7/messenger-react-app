export interface IAuthContext {
    isAuthenticated: boolean,
    setIsAuthenticated: (status: boolean) => void,
}
