module app {
    interface ParseResult {
        cards: Card[];
        failed: string[];
    }

    export class CardGroup {
        name: string;
        cards: Card[];
        failedCards: string[];
        count: number = 0;
        cardBlob: string;

        constructor(private CardService: CardService) {
            this.name = "";
            this.cardBlob = "";
        }

        public setCardBlob = (cards: string): void => {
            var result = this.parseCardBlob(cards);
            this.failedCards = result.failed;
            this.cards = result.cards;
            this.cardBlob = this.failedCards.concat(this.cards.sort((a, b) => a.name > b.name ? 1: -1).map(card => {
                return card.quantity + "x " + card.name;
            })).join("\n");
            this.count = this.cards.reduce((a, b) => {
                return a + Number(b.quantity);
            }, 0);
        }

        private parseCardBlob = (cardInput: string): ParseResult => {
            cardInput = cardInput.trim();

            if (cardInput.length === 0) {
                return { cards: [], failed: [] };
            }

            var result = cardInput.split(/\n[\s\n]*/).reduce((result: ParseResult, text: string) => {
                var results = /^(?:(\d+)[Xx]?\s)?\s*([^0-9]+)$/.exec(text.trim());
                if (results === null) {
                    result.failed.push(text);
                } else {
                    var card = this.CardService.getCard(results[2]);
                    if (card == null) {
                        result.failed.push(text);
                    } else {
                        card.quantity = Number(results[1] || 1);
                        result.cards.push(card);
                    }
                }
                return result;
            }, { cards: [], failed: [] });

            result.failed = result.failed.sort();

            if (result.cards.length > 1) {
                var distinct = result.cards.reduce((dictionary, b) => {
                    if (dictionary[b.name] === undefined) {
                        dictionary[b.name] = b;
                    } else {
                        dictionary[b.name].quantity += b.quantity;
                    }

                    return dictionary;
                }, {});

                result.cards = Object.keys(distinct).sort().map(name => {
                    return distinct[name];
                });
            }

            return result;
        }
    }
}