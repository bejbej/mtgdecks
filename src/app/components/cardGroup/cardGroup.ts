module app {
    class CardGroup implements ng.IDirective {
        restrict = "E";
        scope = {
            data: "=",
            canEdit: "=",
            isEditing: "@",
            shouldLoadPrices: "=",
            cardGroupChanged: "=",
            cardsChanged: "=",
            pricesLoaded: "="

        };
        templateUrl = "cardGroup/cardGroup.html";
    }

    angular.module("app").directive("cardGroup", () => new CardGroup());
}