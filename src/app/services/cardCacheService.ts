module app {
    export class CardCacheService {

        private key = "cards";
        private versionKey = "cards-version";
        private version = "1";

        constructor(
            private config: IConfig,
            private CardFactory: CardFactory) {
            
            if(localStorage.getItem(this.versionKey) !== this.version) {
                localStorage.removeItem(this.key);
                localStorage.setItem(this.versionKey, this.version);
            }
        }

        get = (names: string[]): Card[] => {
            var cache = JSON.parse(localStorage.getItem(this.key));
            var currentDate = new Date().getTime();

            if (!cache) {
                cache = {};
                localStorage.setItem(this.key, JSON.stringify(cache));
                return [];
            }

            var cards = names.map(name => {
                return cache[name.toLowerCase()];
            }).filter(card => {
                if (card !== undefined) {
                    card.date = currentDate;
                    return true;
                } else {
                    return false;
                }
            }).map(cachedCard => {
                return angular.merge(this.CardFactory.createCard(), cachedCard);
            });

            localStorage.setItem(this.key, JSON.stringify(cache));

            return cards;
        }

        add = (cards: Card[]): void => {
            if (this.config.cardCacheLimit === 0) {
                return;
            }

            var cache = JSON.parse(localStorage.getItem(this.key));
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
                //console.log("removing " + n + " cards from the cache");
                keys.sort((a, b) => {
                    return cache[a].date - cache[b].date;
                }).slice(0, n).forEach(key => {
                    delete cache[key];
                });
            }

            localStorage.setItem(this.key, JSON.stringify(cache));
            //console.log("cache contains " + Object.keys(cache).length + " cards");

            var endDate = new Date().getTime();
            //console.log("setting cache took " + Number(endDate - currentDate) + " ms");
        }
    }

    angular.module("app").service("CardCacheService", CardCacheService);
}