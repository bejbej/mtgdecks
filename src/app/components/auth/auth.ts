module app {
    class Auth implements ng.IDirective {
        restrict = "E";
        scope = {};
        templateUrl = "auth/auth.html";
    }

    angular.module("app").directive("auth", () => new Auth());
}