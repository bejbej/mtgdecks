module app {

    class Deck implements ng.IDirective {
        restrict = "E";
        scope = {
            id: "="
        };
        templateUrl = "deck/deck.html";
    }

    angular.module("app").directive("deck", () => new Deck());
}