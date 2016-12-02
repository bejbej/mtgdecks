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

        private combineDuplicateNames = (items: NameQuantityPair[]): NameQuantityPair[] => {
            items = items.sort((a, b) => {
                return a.name > b.name ? 1 : -1;
            });
            
            var combinedItems = [];

            for (var i = 0; i < items.length; ++i) {
                var currentItem = items[i];
                while (items[i + 1] !== undefined && currentItem.name.toLowerCase() === items[i + 1].name.toLowerCase()) {
                    currentItem.quantity += items[i + 1].quantity;
                    delete items[i + 1];
                    ++i;
                }
                combinedItems.push(currentItem);
            }
            
            return combinedItems;
        }

        private parseCards = () => {
            this.failedCardNames = [];

            var nameQuantityPairs = this.cards.split("\n").filter(text => {
                return text.trim().length > 0;
            }).map(text => {
                var results = /^(?:(\d)+[Xx]?\s)?\s*([^0-9]+)$/.exec(text.trim());
                if (results === null) {
                    this.failedCardNames.push(text);
                    return undefined;
                }
                var nameQuantityPair = new NameQuantityPair();
                nameQuantityPair.name = results[2];
                nameQuantityPair.quantity = Number(results[1] || 1);
                return nameQuantityPair;
            }).filter(item => {
                return item != undefined;
            });

            nameQuantityPairs = this.combineDuplicateNames(nameQuantityPairs);

            var names = nameQuantityPairs.map(card => {
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
                nameQuantityPairs.forEach(card => {
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
                    return a.name > b.name ? 1 : -1;
                });
            });
        }
    }
}