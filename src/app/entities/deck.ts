module app {
    export class Deck {
        id: number;
        name: string;
        cardGroups: CardGroup[];

        constructor(private DeckService: DeckService) { }

        public save = (): ng.IPromise<any> => {
            if (this.id) {
                return this.DeckService.updateDeck(this);
            } else {
                return this.DeckService.createDeck(this);
            }
        }
    }
}