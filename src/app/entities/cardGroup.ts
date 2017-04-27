module app {
    export class CardGroup {
        name: string;
        cards: Card[];
        failedCards: NameQuantityPair[];
        massEntryQueryString: string;

        private cardBlob: string;
        private watchers: Function[];

        constructor(
            private $q: ng.IQService,
            private CardService: CardService) {

            this.name = name;
            this.cards = [];
            this.cardBlob = "";
            this.watchers = [];
        }

        public setCardBlob = (cards: string): ng.IPromise<Card[]> => {
            var nameQuantityPairs = this.getNameQuantityPairs(cards);
            this.cardBlob = this.formatCardBlob(nameQuantityPairs);
            return this.loadCards(nameQuantityPairs).finally(this.triggerWatchers);
        }

        public getCardBlob = (): string => {
            return this.cardBlob;
        }

        public count = (): Number => {
            return this.cards.reduce((a, b) => {
                return a + Number(b.quantity);
            }, 0);
        }

        public watch = (func: Function): void => {
            if (this.watchers.indexOf(func) === -1) {
                this.watchers.push(func);
            }
        }

        public unWatch = (func: Function): void => {
            var index = this.watchers.indexOf(func);
            if (index !== -1) {
                this.watchers.splice(index, 1);
            }
        }

        private triggerWatchers = () => {
            this.watchers.forEach(watcher => watcher());
        }

        private formatName = (name: string): string => {
            var convertToTitleCase = (name:string): string => {
                return name.replace(/[^\s-]+/g, (text, index) => {
                    if (index > 0 && ["a", "an", "and", "but", "for", "from", "in" ,"into", "of", "or", "the", "to", "upon","with"].indexOf(text.toLowerCase()) >= 0) {
                        return text.toLowerCase();
                    }
                    return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
                });
            }

            var formatSplitCardName = (name: string):string => {
                return name.replace(/\s*[\/\\]{2}\s*/, " \/\/ ");
            }

            return [
                name => name.trim(),
                formatSplitCardName,
                convertToTitleCase
            ].reduce((name, func) => func(name), name);
        }

        private getNameQuantityPairs = (cardBlob: string): NameQuantityPair[] => {
            return cardBlob.split(/\n[\s\n]*/).map(text => {
                var results = /^(?:(\d+)[Xx]?\s)?\s*([^0-9]+)$/.exec(text.trim());
                var card = new NameQuantityPair();
                if (results === null) {
                    card.name = text;
                } else {
                    card.quantity = Number(results[1] || 1);
                    card.name = this.formatName(results[2]);
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

        private loadCards = (nameQuantityPairs: NameQuantityPair[]): ng.IPromise<Card[]> => {
            this.failedCards = [];

            var names = nameQuantityPairs.map(card => {
                return card.name.trim();
            }).filter(name => {
                return name && name.length > 2;
            });

            if (names.length === 0) {
                this.cards = [];
                return this.$q.when(this.cards);
            }

            return this.CardService.getCards(names).then(cardDetails => {
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

                return this.cards;
            });
        }

        private formatCardBlob = (cards: NameQuantityPair[]): string => {
            return cards.map(card => {
                return (card.quantity ? card.quantity + "x " : "") + card.name;
            }).join("\n");
        }
    }
}