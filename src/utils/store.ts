
class Store {
    static tokenKey: string = 'token';
    static refreshTokenKey: string = 'refresh_token'

    static GetToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }
    static SetToken(tokenValue: string) {
        localStorage.setItem(this.tokenKey, tokenValue)
    }

    static GetRefreshToken(): string | null{
        return localStorage.getItem(this.refreshTokenKey);
    }
    static SetRefreshToken(refreshTokenValue: string) {
        localStorage.setItem(this.refreshTokenKey, refreshTokenValue)
    }

    public static clearStorage() {
        localStorage.clear();
    }
}

export default Store