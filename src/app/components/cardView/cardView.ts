module app {

    class CardView implements ng.IDirective {
        restrict = "E";
        scope = {
            columns: "=",
            showHeaders: "="
        };
        templateUrl = "cardView/cardView.html";
    }

    angular.module("app").directive("cardView", () => new CardView());
}