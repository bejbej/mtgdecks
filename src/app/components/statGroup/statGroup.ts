module app {

    class StatGroup implements ng.IDirective {
        restrict = "E";
        scope = {
            group: "="
        };
        templateUrl = "statGroup/statGroup.html";
    }

    angular.module("app").directive("statGroup", () => new StatGroup());
}