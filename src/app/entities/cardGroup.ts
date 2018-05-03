module app {
    export class CardGroup {
        name: string;
        cards: ICard[];
        failedCards: string[];
        count: number;
        cardBlob: string;

        private arbiter: Arbiter<CardGroup>;

        constructor(
            private cardDefinitions: { [id: string]: ICardDefinition },
            private CardPriceService: CardPriceService) {

            this.name = "";
            this.cards = [];
            this.failedCards = [];
            this.count = 0;
            this.cardBlob = "";

            this.arbiter = new Arbiter(this);
        }

        public on = (event:string, callback: Function) => this.arbiter.on(event, callback);

        public setCardBlob = (cards: string): void => {
            this.parseCardBlob(cards);
            this.cardBlob = this.failedCards.concat(this.cards.sort((a, b) => a.definition.name > b.definition.name ? 1 : -1).map(card => {
                return card.quantity + "x " + card.definition.name;
            })).join("\n");
            this.count = this.cards.reduce((sum, card) => sum + Number(card.quantity), 0);
            this.arbiter.broadcast("changed");
        }

        public loadPrices = () => {
            let unknownCardNames = this.cards.filter(card => !card.usd).map(card => card.definition.name);

            if (unknownCardNames.length === 0) {
                return;
            }

            return this.CardPriceService.getCardPrices(unknownCardNames)
                .then(cardPrices => {
                    let cardPricesDict = Dictionary.fromArray(cardPrices, card => card.name);
                    this.cards.forEach(card => {
                        if (card.usd === undefined) {
                            let cardPrice = cardPricesDict[card.definition.name.toLowerCase()];
                            card.usd = cardPrice ? (Math.round(Number(cardPrice.usd) * card.quantity * 100) / 100).toFixed(2) : null;
                        }
                    });
                    this.arbiter.broadcast("prices-changed");
                });
        }

        private parseCardBlob = (cardInput: string) => {
            cardInput = cardInput.trim();

            this.cards = [];
            this.failedCards = [];

            if (cardInput.length === 0) {
                return;
            }

            cardInput.split(/\n[\s\n]*/).forEach(line => {
                var result = /^(?:(\d+)[Xx]?\s)?\s*([^0-9]+)$/.exec(line.trim());
                if (!result) {
                    this.failedCards.push(line);
                    return;
                }

                let cardDefinition = this.cardDefinitions[result[2].toLowerCase()];
                if (!cardDefinition) {
                    this.failedCards.push(line);
                    return;
                }

                this.cards.push({
                    definition: cardDefinition,
                    quantity: Number(result[1]) || 1,
                    usd: undefined
                });
            });
        }
    }
}