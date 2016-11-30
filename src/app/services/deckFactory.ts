module app {
    export class DeckFactory {

        constructor(private $injector: ng.auto.IInjectorService) { }

        public createDeck(): Deck {
            return new Deck(this.$injector.get<DeckService>("DeckService"));
        }
    }

    angular.module("app").service("DeckFactory", DeckFactory);
}