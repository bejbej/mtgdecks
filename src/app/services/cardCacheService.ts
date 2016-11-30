module app {
    export class CardCacheService {

        private key = "cards";

        get = (name: string): Card => {
            var cache = JSON.parse(localStorage.getItem(this.key));

            if (!cache) {
                cache = {};
                localStorage.setItem(this.key, JSON.stringify(cache));
            }

            var cachedCard = cache[name.toLowerCase()];

            if (cachedCard === undefined) {
                return undefined;
            }

            return angular.merge(new Card(), cachedCard);
        }

        add = (cards: Card[]): void => {
            var cache = JSON.parse(localStorage.getItem(this.key));
            cards.forEach(card => {
                cache[card.name.toLowerCase()] = card;
            });
            localStorage.setItem(this.key, JSON.stringify(cache));
            console.log("cache contains " + Object.keys(cache).length + " cards");
        }
    }

    angular.module("app").service("CardCacheService", CardCacheService);
}