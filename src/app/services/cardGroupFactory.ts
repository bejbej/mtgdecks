module app {
    export class CardGroupFactory {

        constructor(private $injector: ng.auto.IInjectorService) { }

        public createCardGroup(): CardGroup {
            let cardPriceService = this.$injector.get<CardPriceService>("CardPriceService");
            let CardDefinitions = this.$injector.get<{ [id: string]: ICardDefinition}>("CardDefinitions");
            return new CardGroup(CardDefinitions, cardPriceService);
        }
    }

    angular.module("app").service("CardGroupFactory", CardGroupFactory);
}