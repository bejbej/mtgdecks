module app {
    export class CardPriceService {
        private expirationMs;
        private cardCacheLimit;
        private url;
        private key;

        constructor(config: IConfig, private $http: ng.IHttpService, private $q: ng.IQService) {
            this.url = config.cardsUrl;
            this.key = config.localStorage.cards;
            this.cardCacheLimit = config.cardCacheLimit || 0;
            this.expirationMs = config.cardExpirationMs || 0;
        }

        public getCardPrices = (cardNames: string[], timeout: ng.IPromise<any>): ng.IPromise<ICardPrice[]> => {
            cardNames = cardNames.map(cardName => cardName.toLowerCase());
            let knownCards = this.getKnownCards(cardNames);
            let unknownCardNames = cardNames.except(knownCards.map(card => card.name));
            return this.getUnknownCards(unknownCardNames, timeout)
                .then(unknownCards => {
                    let now = new Date().getTime().toString();
                    unknownCards.forEach(card => card.modifiedOn = now);
                    this.save(unknownCards);
                    return knownCards.concat(unknownCards);
                });
        }

        private getCache = (): ICardPrice[] => {
            let cache = localStorage.getItem(this.key)
            return cache ? CSV.parse(cache, "\t") : [];
        }

        private setCache = (cards: ICardPrice[]): void => {
            localStorage.setItem(this.key, CSV.stringify(cards, ["name", "usd", "modifiedOn"], "\t"));
        }

        private getKnownCards = (cardNames: string[]): ICardPrice[] => {
            if (cardNames.length === 0 || this.cardCacheLimit === 0 || this.expirationMs === 0) {
                return [];
            }

            let cutoffDate = new Date().getTime() - this.expirationMs;
            let knownCards = Dictionary.fromArray(<ICardPrice[]>this.getCache(), card => card.name);
            return cardNames.reduce((array, cardName) => {
                let card = knownCards[cardName];
                if (card && Number(card.modifiedOn) > cutoffDate) {
                    array.push(card);
                }
                return array;
            }, []);
        }

        private getUnknownCards = (cardNames: string[], timeout: ng.IPromise<any>): ng.IPromise<ICardPrice[]> => {
            if (cardNames.length === 0) {
                return this.$q.when([]);
            }

            let csv = cardNames.join("\n");
            let config = {
                headers: {
                    "Content-Type": "application/text",
                    "timeout": timeout
                }
            };
            return this.$http.post<string>(this.url, csv, config)
                .then(response => CSV.parse(response.data, "\t"));
        }

        private save = (newCards: ICardPrice[]): void => {
            if (newCards.length === 0 || this.cardCacheLimit === 0 || this.expirationMs === 0) {
                return;
            }

            let cutoffDate = new Date().getTime() - this.expirationMs;
            let cardDict = (<ICardPrice[]>this.getCache()).reduce<{ [id: string]: ICardPrice }>((dictionary, card) => {
                if (Number(card.modifiedOn) > cutoffDate) {
                    dictionary[card.name] = card;
                }

                return dictionary;
            }, {});
            newCards.forEach(card => cardDict[card.name] = card);
            let cards = Dictionary.toArray(cardDict);
            if (cards.length > this.cardCacheLimit) {
                cards = cards.sort((a, b) => Number(a.modifiedOn) < Number(b.modifiedOn) ? 1 : -1)
                cards.splice(this.cardCacheLimit);
            }

            this.setCache(cards);
        }
    }

    angular.module("app").service("CardPriceService", CardPriceService);
}