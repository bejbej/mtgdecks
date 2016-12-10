module app {
    export class CardGroup {
        name: string;
        cards: Card[];
        failedCards: NameQuantityPair[];

        private cardBlob: string;

        constructor(private CardService: CardService) {
            this.name = name;
            this.cards = [];
            this.cardBlob = "";
        }

        public setCardBlob = (cards: string): void => {
            var nameQuantityPairs = this.getNameQuantityPairs(cards);
            this.loadCards(nameQuantityPairs);
            this.cardBlob = this.formatCardBlob(nameQuantityPairs);
        }

        public getCardBlob = (): string => {
            return this.cardBlob;
        }

        public count = (): Number => {
            return this.cards.reduce((a, b) => {
                return a + Number(b.quantity);
            }, 0);
        }

        private convertToTitleCase = (name:string): string => {
            return name.replace(/[^\s-]+/g, text => {
                if (["a", "an", "of", "the", "to"].indexOf(text) >= 0) {
                    return text;
                }
                return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
            });
        }

        private getNameQuantityPairs = (cardBlob: string): NameQuantityPair[] => {
            return cardBlob.split(/\n[\s\n]*/).map(text => {
                var results = /^(?:(\d+)[Xx]?\s)?\s*([^0-9]+)$/.exec(text.trim());
                var card = new NameQuantityPair();
                if (results === null) {
                    card.name = text;
                } else {
                    card.quantity = Number(results[1] || 1);
                    card.name = this.convertToTitleCase(results[2].trim());
                }
                return card;
            }).reduce((a, b) => {
                var existingCard = a.filter(card => {
                    return card.name === b.name;
                })[0];

                if (existingCard) {
                    existingCard.quantity = existingCard.quantity + b.quantity;
                } else {
                    a.push(b);
                }
                
                return a;
            }, []).sort((a, b) => {
                if ((a.quantity === undefined) === (b.quantity === undefined)) {
                    return a.name > b.name ? 1 : -1;
                }
                if (a.quantity === undefined) {
                    return 1;
                }
                if (b.quantity === undefined) {
                    return -1;
                }
            });
        }

        private loadCards = (nameQuantityPairs: NameQuantityPair[]): void => {
            this.failedCards = [];

            var names = nameQuantityPairs.map(card => {
                return card.name.trim();
            }).filter(name => {
                return name && name.length > 2;
            });

            if (names.length === 0) {
                this.cards = [];
                return;
            }

            this.CardService.getCards(names).then(cardDetails => {
                var hydratedCards: Card[] = [];
                nameQuantityPairs.forEach(card => {
                    var matchingCard = cardDetails.filter(cardDetail => {
                        return cardDetail.name.toLowerCase() === card.name.toLowerCase();
                    })[0];

                    if (matchingCard === undefined) {
                        this.failedCards.push(card);
                        return;
                    }

                    matchingCard.quantity = card.quantity;
                    hydratedCards.push(matchingCard);
                });

                this.cards = hydratedCards.sort((a, b) => {
                    return a.name > b.name ? 1 : -1;
                });
            });
        }

        private formatCardBlob = (cards: NameQuantityPair[]): string => {
            return cards.map(card => {
                return (card.quantity ? card.quantity + "x " : "") + card.name;
            }).join("\n");
        }
    }
}