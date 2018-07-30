module app {
    class AuthController {

        isLoggingIn: boolean;

        constructor(private authService: AuthService) { }

        login = () => {
            this.isLoggingIn = true;
            return this.authService.login().finally(() => {
                this.isLoggingIn = false;
            });
        }

        logout = () => {
            return this.authService.logout();
        }

        isLoggedIn = () => {
            return this.authService.isLoggedIn();
        }
    }
    
    angular.module("app").controller("authController", AuthController);
}