module app {
    export class Deck {
        id: number;
        name: string;
        cardGroups: CardGroup[];
        owners: string[];

        constructor(
            private $q: ng.IQService,
            private DeckService: DeckService) { }

        public save = (): ng.IPromise<any> => {
            if (this.id) {
                return this.DeckService.updateDeck(this);
            } else {
                return this.DeckService.createDeck(this).then(id => {
                    this.id = id;
                });
            }
        }

        public delete = (): ng.IPromise<any> => {
            if (this.id) {
                return this.DeckService.deleteDeck(this.id).then(() => {
                    this.id = undefined;
                });
            } else {
                return this.$q.reject();
            }
        }
    }
}