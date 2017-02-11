module app {

    interface IRouteParams {
        id: number | string;
    }

    class DeckController {

        public deck: Deck;
        public isSaving: boolean;
        public isDeleting: boolean;
        public canEdit: boolean;
        public canCreate: boolean;
        public timeout: ng.IDeferred<any>;

        constructor(
            $routeParams: IRouteParams,
            private $location: any,
            private $q: ng.IQService,
            private $scope,
            private DeckService: DeckService,
            private DeckFactory: DeckFactory,
            private CardGroupFactory: CardGroupFactory) {

            if ($routeParams.id === "new") {
                this.deck = this.createNewDeck();
                this.updateAuthentication();
                this.updateTitle();
            } else {
                this.timeout = this.$q.defer();
                this.DeckService.getDeck($routeParams.id, this.timeout.promise).then(deck => {
                    this.deck = deck;
                    this.updateAuthentication();
                    this.updateTitle();
                }).finally(() => {
                    delete this.timeout;
                });
            }

            this.$scope.$on("authentication-changed", this.updateAuthentication);
            this.$scope.$on("$destroy", this.cancelPendingRequests);
        }

        private updateTitle = () => {
            document.title = this.deck.name;
        }

        private updateAuthentication = () => {
            var user = this.$scope.user;
            this.canCreate = Boolean(user);
            this.canEdit = !this.deck.id || (user && this.deck.owners.indexOf(user.id) >= 0);
        }

        private onChange = () => {
            this.updateTitle();
            if (this.deck.id) {
                this.deck.save();
            }
        }

        private save = () => {
            this.isSaving = true;
            this.deck.save().finally(() => {
                this.deck.owners = [this.$scope.user.id];
                this.isSaving = false;
                this.$location.update_path("/decks/" + this.deck.id);
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

        private cancelPendingRequests = () => {
            if (this.timeout) {
                this.timeout.resolve();
            }
        }
    }

    angular.module("app").controller("DeckController", DeckController);
}