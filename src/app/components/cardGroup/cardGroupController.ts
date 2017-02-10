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
        onChange: Function;
        showToolbar: boolean;
        view: string = "group-by-type";

        constructor(
            private $scope: scope,
            config: IConfig) {
                
            this.cardGroup = this.$scope.group;
            this.onChange = this.$scope.onChange;

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
            this.cardsBlob = this.cardGroup.getCardBlob();
            this.isEditing = true;
        }

        applyChanges = (): void => {
            if (this.form.$dirty) {
                this.cardGroup.setCardBlob(this.cardsBlob);
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