module app {

    class Stats implements ng.IDirective {
        restrict = "E";
        scope = {
            cards: "="
        };
        controller = "statsController as vm";
        templateUrl = "stats/statsView.html";
    }

    angular.module("app").directive("stats", () => new Stats());
}