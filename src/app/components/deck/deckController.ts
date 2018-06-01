module app {

    interface IRouteParams {
        id: string;
    }

    class DeckController {

        public deck: Deck;
        public isSaving: boolean;
        public isDeleting: boolean;
        public canEdit: boolean;
        public canCreate: boolean;
        public showPrices: boolean;

        private timeout: ng.IDeferred<any>;

        constructor(
            $routeParams: IRouteParams,
            private $location: any,
            private $q: ng.IQService,
            private $scope: ng.IScope,
            private config: IConfig,
            private AuthService: AuthService,
            private DeckService: DeckService,
            private DeckFactory: DeckFactory,
            private CardPriceService: CardPriceService,
            private CardGroupFactory: CardGroupFactory) {

            this.getDeck($routeParams.id).then(deck => {
                this.deck = deck;
                this.sync();
                this.updateTitle();
                this.deck.cardGroups.forEach(cardGroup => {
                    cardGroup.on("changed", event => {
                        this.save();
                        if (this.showPrices) {
                            event.target.loadPrices();
                        }
                    });
                });
            })

            this.$scope.$on("authentication-changed", this.sync);
            this.$scope.$on("$destroy", this.destroy);
        }

        public togglePrices = () => {
            this.showPrices = !this.showPrices;
            if (this.showPrices) {
                this.deck.cardGroups.forEach(cardGroup => cardGroup.loadPrices());
            }
        }

        private updateTitle = () => {
            document.title = this.deck.name;
        }

        private sync = () => {
            var authUser = this.AuthService.getAuthUser();
            this.canCreate = authUser !== undefined;
            this.canEdit = !this.deck.id || (authUser && this.deck.owners.indexOf(authUser.id) >= 0);
            if (this.canCreate && !this.deck.id && this.deck.cardGroups.some(cardGroup => cardGroup.cards.length > 0)) {
                this.save();
            }
        }

        private save = () => {
            this.updateTitle();

            var authUser = this.AuthService.getAuthUser();
            if (authUser === undefined) {
                return;
            }

            this.isSaving = true;
            this.deck.save().then(() => {
                this.deck.owners = this.deck.owners || [authUser.id];
                this.$location.update_path("/decks/" + this.deck.id);
            }).finally(() => {
                this.isSaving = false;
            });
        }

        private delete = () => {
            var r = confirm("Are you sure you want to delete this deck?");
            if (r) {
                this.isDeleting = true;
                this.deck.delete().then(() => {
                    location.hash = "/decks";
                }).finally(() => {
                    this.isDeleting = false;
                });
            }
        }

        private getDeck = (id: string): ng.IPromise<Deck> => {
            if (id === "new") {
                return this.$q.when(this.createNewDeck());
            } else {
                document.title = "Loading";
                this.timeout = this.$q.defer();
                return this.DeckService.getDeck(id, this.timeout.promise).then(deck => {
                    return deck;
                }).finally(() => {
                    delete this.timeout;
                });
            }
        }

        private createNewDeck = () => {
            var deck = this.DeckFactory.createDeck();
            deck.name = "New Deck";
            var mainboard = this.CardGroupFactory.createCardGroup();
            var sideboard = this.CardGroupFactory.createCardGroup();
            mainboard.name = "Mainboard";
            sideboard.name = "Sideboard";
            deck.cardGroups = [mainboard, sideboard];
            deck.notes = "";

            var tags = <ITags>JSON.parse(localStorage.getItem(this.config.localStorage.tags));
            if (tags && tags.current) {
                deck.tags = [tags.current];
            }

            return deck;
        }

        private destroy = () => {
            if (this.timeout) {
                this.timeout.resolve();
            }

            if (this.deck) {
                this.deck.destroy();
            }
        }
    }

    angular.module("app").controller("DeckController", DeckController);
}