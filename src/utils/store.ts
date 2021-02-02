
class Store {
    static tokenKey: string = 'token';

    static GetToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }
    static SetToken(tokenValue: string) {
        localStorage.setItem(this.tokenKey, tokenValue)
    }

    public static clearStorage() {
        localStorage.clear();
    }
}

export default Store