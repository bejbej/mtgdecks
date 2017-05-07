module app {

    class AuthController {

        private isLoggingIn: boolean;

        constructor(private AuthService: AuthService) { }

        login = () => {
            this.isLoggingIn = true;
            return this.AuthService.login().finally(() => {
                this.isLoggingIn = false;
            });
        }

        logout = () => {
            return this.AuthService.logout();
        }

        isLoggedIn = () => {
            return this.AuthService.isLoggedIn();
        }
    }

    angular.module("app").controller("AuthController", AuthController);
}