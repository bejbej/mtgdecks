module app {
    export class CardGroup {
        name: string;
        cardList: Card[];
        failedCardNames: string[];

        private cards: string;

        constructor(private CardService: CardService) {
            this.name = name;
            this.cardList = [];
            this.cards = "";
        }

        public setCards = (cards: string): void => {
            this.cards = cards;
            this.parseCards();
        }

        public getCards = (): string => {
            return this.cards;
        }

        public getCardsByPrimaryType = (type): Card[] => {
            return this.cardList.filter(card => {
                return card.primaryType === type;
            });
        }

        public count = (): Number => {
            return this.cardList.reduce((a, b) => {
                return a + Number(b.quantity);
            }, 0);
        }

        public countByPrimaryType = (type): Number => {
            return this.getCardsByPrimaryType(type).reduce((a, b) => {
                return a + Number(b.quantity);
            }, 0);
        }

        private parseCards = () => {
            this.failedCardNames = [];

            var cards = this.cards.split("\n").map(text => {
                var results = /^([\d]*)[x ]*(.*)$/.exec(text.trim());
                var card = new Card();
                card.name = results[2];
                card.quantity = Number(results[1]);
                return card;
            });

            var names = cards.map(card => {
                return card.name.trim();
            }).filter(name => {
                return name && name.length > 2;
            });

            if (names.length === 0) {
                this.cardList = [];
                return;
            }

            this.CardService.getCards(names).then(cardDetails => {
                var hydratedCards: Card[] = [];
                cards.forEach(card => {
                    var matchingCard = cardDetails.filter(cardDetail => {
                        return cardDetail.name.toLowerCase() === card.name.toLowerCase();
                    })[0];

                    if (matchingCard === undefined) {
                        this.failedCardNames.push(card.name);
                        return;
                    }

                    matchingCard.quantity = card.quantity;
                    hydratedCards.push(matchingCard);
                });

                this.cardList = hydratedCards.sort((a, b) => {
                    return a.name > b.name? 1 : -1;
                });
            });
        }
    }
}