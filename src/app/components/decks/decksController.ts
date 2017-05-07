module app {

    class DecksController {

        private decks: any[];
        private visibleDecks: Deck[];
        private timeout: ng.IDeferred<any>;

        constructor(
            private $q: ng.IQService,
            private $scope,
            private AuthService: AuthService,
            private config: IConfig,
            private DeckService: DeckService) {

            this.sync();
            this.$scope.$on("authentication-changed", this.sync);
            this.$scope.$on("$destroy", this.cancelPendingRequests);
        }

        getDecks = () => {
            this.timeout = this.$q.defer();

            var user = this.AuthService.getAuthUser();
            this.DeckService.getDecksByQuery({ owner: user.id }, this.timeout.promise).then(decks => {
                this.decks = decks.sort((a, b) => {
                    return a.name > b.name ? 1 : -1;
                });
            }).finally(() => {
                delete this.timeout;
            });
        }

        sync = () => {
            var authUser = this.AuthService.getAuthUser()

            if (this.decks !== undefined && authUser === undefined) {
                this.cancelPendingRequests();
                delete this.decks;
            }

            if (this.decks === undefined && authUser !== undefined) {
                this.getDecks();
            }
        }

        cancelPendingRequests = () => {
            console.log("cancelling");            
            if (this.timeout) {
                this.timeout.resolve();
            }
        }
    }

    angular.module("app").controller("DecksController", DecksController);
}