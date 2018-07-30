module app {

    export class AuthService {

        private isAuthenticated: boolean;
        private arbiter: Arbiter<void> = new Arbiter<void>();

        constructor(
            private $auth: Auth,
            private $http: ng.IHttpService,
            private config: IConfig) {

            this.isAuthenticated = this.$auth.isAuthenticated();
            if (!this.isAuthenticated) {
                this.logout();
            }
        }

        login = (): ng.IPromise<any> => {
            return this.$auth.authenticate("google").then(() => {
                return this.$http.post<IUser>(this.config.usersUrl + "/me", null)
                    .then(response => {
                        localStorage.setItem(this.config.localStorage.user, JSON.stringify(response.data));
                        this.updateAuthenticationStatus();
                    })
                    .catch(this.logout);
            })
        }

        logout = (): ng.IPromise<any> => {
            return this.$auth.logout().then(() => {
                localStorage.removeItem(this.config.localStorage.user);
                localStorage.removeItem(this.config.localStorage.tags);
                this.updateAuthenticationStatus();
            });
        }

        isLoggedIn = (): boolean => {
            if (this.$auth.isAuthenticated()) {
                return true;
            } else {
                if (this.isAuthenticated) {
                    this.logout();
                }
            }
        }

        getAuthUser = (): IUser => {
            var user = undefined;
            if (this.$auth.isAuthenticated()) {
                var user = JSON.parse(localStorage.getItem(this.config.localStorage.user));
                if (user === undefined) {
                    this.logout();
                }
            } else {
                if (this.isAuthenticated) {
                    this.logout();
                }
            }
            return user;
        }

        subscribe = (callback) => {
            return this.arbiter.subscribe(callback);
        }

        private updateAuthenticationStatus = () => {
            this.isAuthenticated = this.$auth.isAuthenticated();
            this.arbiter.broadcast();
        }
    }

    angular.module("app").service("authService", AuthService);
}