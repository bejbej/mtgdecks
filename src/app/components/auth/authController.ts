module app {

    class AuthController {

        private isLoggedIn: boolean;
        private isLoggingIn: boolean;

        constructor(
            private $rootScope,
            private $auth,
            private UserService: UserService) {

            this.updateAuthenticationStatus();
        }

        login = () => {
            this.isLoggingIn = true;
            this.$auth.authenticate("google").then((temp) => {
                this.UserService.getMe().then(user => {
                    localStorage.setItem("user", JSON.stringify(user));
                    this.isLoggingIn = false;
                    this.updateAuthenticationStatus();
                });
            }, () => {
                this.isLoggingIn = false;
                console.log("failed to login");
            });
        }

        logout = () => {
            this.$auth.logout();
            localStorage.removeItem("user");
            this.updateAuthenticationStatus();
        }

        updateAuthenticationStatus = () => {
            this.isLoggedIn = this.$auth.isAuthenticated();
            this.$rootScope.user = JSON.parse(localStorage.getItem("user"));
            this.$rootScope.$broadcast("authentication-changed");
        }

    }

    angular.module("app").controller("AuthController", AuthController);
}