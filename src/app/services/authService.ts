module app {

    export class AuthService {

        private isAuthenticated: boolean;

        constructor(
            private $auth: Auth,
            private $rootScope,
            private config: IConfig,
            private UserService: UserService) {
                this.isAuthenticated = this.$auth.isAuthenticated();
            }

        login = (): ng.IPromise<any> => {
            return this.$auth.authenticate("google").then(() => {
                return this.UserService.getMe().then(user => {
                    localStorage.setItem("user", JSON.stringify(user));
                    this.updateAuthenticationStatus();
                    return user;
                }, this.logout);
            })
        }

        logout = (): ng.IPromise<any> => {
            return this.$auth.logout().then(() => {
                localStorage.removeItem(this.config.localStorage.user);
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

        getAuthUser = (): User => {
            if (this.$auth.isAuthenticated()) {
                return JSON.parse(localStorage.getItem(this.config.localStorage.user));
            } else {
                if (this.isAuthenticated) {
                    this.logout();
                }
            }
        }

        private updateAuthenticationStatus = () => {
            this.isAuthenticated = this.$auth.isAuthenticated();
            this.$rootScope.$broadcast("authentication-changed");
        }
    }

    angular.module("app").service("AuthService", AuthService);
}