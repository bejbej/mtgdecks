module app {

    interface IRouteParams {
        id: number | string;
    }

    class DeckController {

        public deck: Deck;
        public isSaving: boolean;
        public isDeleting: boolean;

        constructor(
            $routeParams: IRouteParams,
            private $location: any,
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

        private onChange = () => {
            if (this.deck.id) {
                this.deck.save();
            }
        }

        private save = () => {
            this.isSaving = true;
            this.deck.save().finally(() => {
                this.isSaving = false;
                this.$location.update_path("/decks/" + this.deck.id);
            });
        }

        private delete = () => {
            var r = confirm("Are you sure you want to remove this deck from the cloud?");
            if (r) {
                this.isDeleting = true;
                this.deck.delete().finally(() => {
                    this.isDeleting = false;
                    this.$location.update_path("/decks/new");
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