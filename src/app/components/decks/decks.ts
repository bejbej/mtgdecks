module app {

    class Decks implements ng.IDirective {
        restrict = "E";
        templateUrl = "decks/decks.html";
    }

    angular.module("app").directive("decks", () => new Decks());
}