module app {

    export class AuthService {

        private isAuthenticated: boolean;

        constructor(
            private $auth: Auth,
            private $rootScope,
            private config: IConfig,
            private UserService: UserService) {
                this.isAuthenticated = this.$auth.isAuthenticated();
                if (!this.isAuthenticated) {
                    this.logout();
                }
            }

        login = (): ng.IPromise<any> => {
            return this.$auth.authenticate("google").then(() => {
                return this.UserService.getMe().then(user => {
                    localStorage.setItem(this.config.localStorage.user, JSON.stringify(user));
                    this.updateAuthenticationStatus();
                    return user;
                }, this.logout);
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

        getAuthUser = (): User => {
            var user = undefined;
            if (this.$auth.isAuthenticated()) {
                var user =  JSON.parse(localStorage.getItem(this.config.localStorage.user));
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

        private updateAuthenticationStatus = () => {
            this.isAuthenticated = this.$auth.isAuthenticated();
            this.$rootScope.$broadcast("authentication-changed");
        }
    }

    angular.module("app").service("AuthService", AuthService);
}