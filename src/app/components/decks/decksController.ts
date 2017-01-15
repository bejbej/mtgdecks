module app {

    class DecksController {

        private decks: any[];

        constructor(DeckService: DeckService) {
            DeckService.getDecksByQuery(null).then(decks => {
                document.title = "My Decks";
                this.decks = decks.sort((a, b) => {
                    return a.name > b.name ? 1 : -1;
                });
            });
        }
    }

    angular.module("app").controller("DecksController", DecksController);
}