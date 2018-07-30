module app {
    class NotFound implements ng.IDirective {
        restrict = "E";
        scope = {};
        templateUrl = "notFound/notFound.html";
    }

    angular.module("app").directive("notFound", () => new NotFound());
}