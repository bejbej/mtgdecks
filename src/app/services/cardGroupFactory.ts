module app {
    export class CardGroupFactory {

        constructor(private $injector: ng.auto.IInjectorService) { }

        public createCardGroup(): CardGroup {
            return new CardGroup(
                this.$injector.get<ng.IQService>("$q"),
                this.$injector.get<CardService>("CardService"));
        }
    }

    angular.module("app").service("CardGroupFactory", CardGroupFactory);
}