module app {
    export interface Auth {
        isAuthenticated: () => boolean;
        authenticate: (type: string) => ng.IPromise<any>;
        logout: () => ng.IPromise<any>;
    }
}