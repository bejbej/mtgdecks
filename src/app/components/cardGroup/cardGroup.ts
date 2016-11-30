module app {

    class CardGroup implements ng.IDirective {
        restrict = "E";
        scope = {
            group: "="
        };
        templateUrl = "cardGroup/cardGroup.html";
    }

    angular.module("app").directive("cardGroup", () => new CardGroup());
}