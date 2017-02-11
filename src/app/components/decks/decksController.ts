module app {

    class DecksController {

        private decks: any[];
        private timeout: ng.IDeferred<any>;

        constructor(
            private $q: ng.IQService,
            private $scope,
            private DeckService: DeckService) {

            this.updateAuthentication();
            this.$scope.$on("authentication-changed", this.updateAuthentication);
            this.$scope.$on("$destroy", this.cancelPendingRequests);
        }

        getDecks = () => {
            this.timeout = this.$q.defer();

            this.DeckService.getDecksByQuery({ owner: this.$scope.user.id }, this.timeout.promise).then(decks => {
                this.decks = decks.sort((a, b) => {
                    return a.name > b.name ? 1 : -1;
                });
            }).finally(() => {
                delete this.timeout;
            });
        }

        updateAuthentication = () => {
            if (this.$scope.user) {
                if (!this.decks) {
                    this.getDecks();
                }
            } else {
                delete this.decks;
                this.cancelPendingRequests();
            }
        }

        cancelPendingRequests = () => {
            if (this.timeout) {
                this.timeout.resolve();
            }
        }
    }

    angular.module("app").controller("DecksController", DecksController);
}