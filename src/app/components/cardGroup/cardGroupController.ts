module app {

    interface scope extends ng.IScope {
        group: CardGroup;
    }

    class CardGroupController {

        cardGroup: CardGroup;
        categories: ICategory[];
        isEditing: boolean;
        cardsBlob: string;
        form: ng.IFormController;

        constructor(
            $scope: scope,
            config: IConfig) {
                
            this.cardGroup = $scope.group;
            this.isEditing = false;
            this.categories = config.categories;
        }

        startEditing = (): void => {
            this.cardsBlob = this.cardGroup.getCards();
            this.isEditing = true;
        }

        applyChanges = (): void => {
            if (this.form.$dirty) {
                this.cardGroup.setCards(this.cardsBlob);
            }
            this.isEditing = false;
        }

        discardChanges = (): void => {
            this.isEditing = false;
        }
    }

    angular.module("app").controller("CardGroupController", CardGroupController);

}