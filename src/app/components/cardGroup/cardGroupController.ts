module app {

    interface scope extends ng.IScope {
        canEdit: boolean;
        group: CardGroup;
        onChange: Function;
        isEditing: string;
    }

    class CardGroupController {

        cardGroup: CardGroup;
        canEdit: boolean;
        isEditing: boolean;
        cardsBlob: string;
        form: ng.IFormController;
        showToolbar: boolean;
        view: string = "group-by-type";

        constructor(
            private $scope: scope,
            config: IConfig) {
                
            this.cardGroup = this.$scope.group;

            this.updateEditability();
            this.$scope.$watch("canEdit", this.updateEditability);

            this.$scope.isEditing === "true" ? this.startEditing() : this.discardChanges();
        }

        updateEditability = (): void => {
            this.canEdit = this.$scope.canEdit;
            if (!this.$scope.canEdit) {
                this.discardChanges();
            }
        }

        startEditing = (): void => {
            this.cardsBlob = this.cardGroup.cardBlob;
            this.isEditing = true;
        }

        applyChanges = (): void => {
            if (this.form.$dirty) {
                this.cardGroup.setCardBlob(this.cardsBlob);
            }
            this.isEditing = false;
        }

        discardChanges = (): void => {
            this.isEditing = false;
        }

        isEmpty = (): boolean => {
            return this.cardGroup.cards.length + (this.cardGroup.failedCards || []).length === 0;
        }
    }

    angular.module("app").controller("CardGroupController", CardGroupController);

}