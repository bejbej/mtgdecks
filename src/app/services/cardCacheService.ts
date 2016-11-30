module app {
    export class CardCacheService {

        private key = "cards";

        constructor(private CardFactory: CardFactory) { }

        get = (names: string[]): Card[] => {
            var cache = JSON.parse(localStorage.getItem(this.key));

            if (!cache) {
                cache = {};
                localStorage.setItem(this.key, JSON.stringify(cache));
                return [];
            }

            return names.map(name => {
                return cache[name.toLowerCase()];
            }).filter(card => {
                return card !== undefined;
            }).map(cachedCard => {
                return angular.merge(this.CardFactory.createCard(), cachedCard);
            });
        }

        add = (cards: Card[]): void => {
            var cache = JSON.parse(localStorage.getItem(this.key));
            cards.map(card => {
                return {
                    name: card.name,
                    primaryType: card.primaryType,
                    cmc: card.cmc,
                    multiverseId: card.multiverseId
                };
            }).forEach(card => {
                cache[card.name.toLowerCase()] = card;
            });
            localStorage.setItem(this.key, JSON.stringify(cache));
            console.log("cache contains " + Object.keys(cache).length + " cards");
        }
    }

    angular.module("app").service("CardCacheService", CardCacheService);
}