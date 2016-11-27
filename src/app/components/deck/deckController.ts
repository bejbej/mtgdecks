module app {

    class DeckController {

        public deck: Deck;

        constructor(
            $routeParams: any,
            private DeckService: DeckService,
            private DeckFactory: DeckFactory,
            private CardGroupFactory: CardGroupFactory) {

            if ($routeParams.id === "new") {
                this.deck = this.createNewDeck();
            } else {
                this.DeckService.getDeck($routeParams.id).then(deck => {
                    this.deck = deck;
                });
            }
        }

        private createNewDeck = () => {
            var deck = this.DeckFactory.createDeck();
            deck.name = "New Deck";
            var mainboard = this.CardGroupFactory.createCardGroup();
            var sideboard = this.CardGroupFactory.createCardGroup();
            var maybeboard = this.CardGroupFactory.createCardGroup();
            mainboard.name = "Mainboard";
            sideboard.name = "Sideboard";
            maybeboard.name = "Maybeboard";
            deck.cardGroups = [mainboard, sideboard, maybeboard];
            return deck;
        }
    }

    angular.module("app").controller("DeckController", DeckController);
}