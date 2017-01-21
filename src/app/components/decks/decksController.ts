module app {

    class DecksController {

        private decks: any[];
        private isSearching: boolean;

        constructor(
            private $scope,
            private DeckService: DeckService) {

            this.getDecks();
            this.$scope.$on("authentication-changed", this.getDecks);
        }

        getDecks = () => {
            var user = this.$scope.user;

            if (!user) {
                delete this.decks;
                return;
            }

            this.isSearching = true;
            this.DeckService.getDecksByQuery({owner: user.id}).then(decks => {
                this.decks = decks.sort((a, b) => {
                    return a.name > b.name ? 1 : -1;
                });
            }).finally(() => {
                this.isSearching = false;
            });
        }
    }

    angular.module("app").controller("DecksController", DecksController);
}