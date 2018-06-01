module app {
    export class CardGroupFactory {

        constructor(private $injector: ng.auto.IInjectorService) { }

        public createCardGroup(): CardGroup {
            let $q = this.$injector.get<ng.IQService>("$q");
            let cardPriceService = this.$injector.get<CardPriceService>("CardPriceService");
            let CardDefinitions = this.$injector.get<{ [id: string]: ICardDefinition}>("CardDefinitions");
            return new CardGroup($q, CardDefinitions, cardPriceService);
        }
    }

    angular.module("app").service("CardGroupFactory", CardGroupFactory);
}