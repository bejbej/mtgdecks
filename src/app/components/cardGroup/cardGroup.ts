module app {

    class CardGroup implements ng.IDirective {
        restrict = "E";
        scope = {
            canEdit: "=",
            group: "=",
            onChange: "=",
            isEditing: "@"

        };
        templateUrl = "cardGroup/cardGroup.html";
    }

    angular.module("app").directive("cardGroup", () => new CardGroup());
}