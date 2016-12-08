module app {

    interface scope extends ng.IScope {
        group: CardGroup;
        onChange: Function;
    }

    class CardGroupController {

        cardGroup: CardGroup;
        isEditing: boolean;
        cardsBlob: string;
        form: ng.IFormController;
        onChange: Function;
        showToolbar: boolean;
        view: string = "group-by-type";

        constructor(
            $scope: scope,
            config: IConfig) {
                
            this.cardGroup = $scope.group;
            this.onChange = $scope.onChange;
            this.isEditing = false;
        }

        startEditing = (): void => {
            this.cardsBlob = this.cardGroup.getCards();
            this.isEditing = true;
        }

        applyChanges = (): void => {
            if (this.form.$dirty) {
                this.cardGroup.setCards(this.cardsBlob);
                if (this.onChange) {
                    this.onChange();
                }
            }
            this.isEditing = false;
        }

        discardChanges = (): void => {
            this.isEditing = false;
        }
    }

    angular.module("app").controller("CardGroupController", CardGroupController);

}