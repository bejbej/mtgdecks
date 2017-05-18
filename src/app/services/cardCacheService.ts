module app {
    interface ICardCacheResponse {
        cards: Card[];
        failedNames: string[];
    }

    export class CardCacheService {

        constructor(
            private config: IConfig,
            private CardFactory: CardFactory) {
            
            if(localStorage.getItem(this.config.localStorage.cardsVersion) !== this.config.cardCacheVersion.toString()) {
                localStorage.removeItem(this.config.localStorage.cards);
                localStorage.setItem(this.config.localStorage.cardsVersion, this.config.cardCacheVersion.toString());
            }
        }

        get = (names: string[]): ICardCacheResponse => {
            var cache = JSON.parse(localStorage.getItem(this.config.localStorage.cards));
            var currentDate = new Date().getTime();

            if (!cache) {
                cache = {};
                localStorage.setItem(this.config.localStorage.cards, JSON.stringify(cache));
                return {
                    cards: [],
                    failedNames: names
                };
            }

            var result = {
                cards: [],
                failedNames: []
            };

            var result = names.reduce((result, name) => {
                var cachedCard = cache[name.toLowerCase()];
                if (cachedCard === undefined) {
                    result.failedNames.push(name);
                } else {
                    cachedCard.date = currentDate;
                    var card = angular.merge(this.CardFactory.createCard(), cachedCard);
                    delete card.date;
                    result.cards.push(card);
                }
                return result;
            }, result);

            localStorage.setItem(this.config.localStorage.cards, JSON.stringify(cache));

            return result;
        }

        add = (cards: Card[]): void => {
            if (this.config.cardCacheLimit === 0) {
                return;
            }

            var cache = JSON.parse(localStorage.getItem(this.config.localStorage.cards));
            var currentDate = new Date().getTime();

            cards.map(card => {
                return {
                    date: currentDate,
                    name: card.name,
                    primaryType: card.primaryType,
                    cmc: card.cmc,
                    multiverseId: card.multiverseId,
                    color: card.color
                };
            }).forEach(card => {
                cache[card.name.toLowerCase()] = card;
            });

            var keys = Object.keys(cache);
            if (keys.length > this.config.cardCacheLimit) {
                var n = keys.length - this.config.cardCacheLimit;
                var n = n > this.config.cardCacheLimit / 10 ? n : Math.ceil(this.config.cardCacheLimit / 10);
                keys.sort((a, b) => {
                    return cache[a].date - cache[b].date;
                }).slice(0, n).forEach(key => {
                    delete cache[key];
                });
            }

            localStorage.setItem(this.config.localStorage.cards, JSON.stringify(cache));
        }
    }

    angular.module("app").service("CardCacheService", CardCacheService);
}