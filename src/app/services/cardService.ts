module app {
    export class CardService {
        private cache: { [id: string] : Card; };

        constructor(
            private config: IConfig,
            private $http: ng.IHttpService,
            private $q: ng.IQService,
            private CardCacheService: CardCacheService,
            private CardFactory: CardFactory) {
            
            this.cache = {};
        }

        getCards = (names: string[]): ng.IPromise<Card[]> => {
            var cachedCards = this.CardCacheService.get(names);

            var unknownNames = names.filter(name => {
                return !cachedCards.some(cachedCard => {
                    return cachedCard.name.toLowerCase() === name.toLowerCase();
                });
            });

            if (unknownNames.length === 0) {
                return this.$q.when(cachedCards);
            }

            var deferred = this.$q.defer();

            var url = this.config.cardsUrl + "?" + unknownNames.map(name => {
                return "name=" + name.replace(/ /g, "+");
            }).join("&");

            this.getCardsRecursively(url, names, cachedCards, 0, deferred);

            return deferred.promise;
        }

        private getCardsRecursively = (url: string, names: string[], cards: Card[], page, promise: ng.IDeferred<Card[]>): void => {
            if (page > 1) {
                throw "page is too damn high";
            }

            var newUrl = url + "&page=" + page;
            this.$http.get<IApiCard[]>(newUrl).then(response => {
                cards = cards.concat(response.data.map(this.mapApiCard));
                if (response.data.length >= 100) {
                    this.getCardsRecursively(url, names, cards, page + 1, promise);
                } else {
                    names = names.map(name => {
                        return name.toLowerCase();
                    });

                    var matchingCards = [];

                    cards.forEach(card => {
                        if (names.indexOf(card.name.toLowerCase()) >= 0) {
                            matchingCards.push(card);
                        }
                    });

                    this.CardCacheService.add(matchingCards);
                    promise.resolve(matchingCards);
                }
            });
        };

        private mapApiCard = (apiData: IApiCard): Card => {
            var card = this.CardFactory.createCard();
            card.name = apiData.name;
            card.cmc = apiData.cmc;
            card.primaryType = this.config.types.filter(type => {
                return apiData.types.indexOf(type) >= 0;
            })[0];
            card.multiverseId = apiData.editions.map(edition => {
                return edition.multiverse_id;
            }).sort((a, b) => {
                return a - b;
            }).pop();

            return card;
        }
    }

    angular.module("app").service("CardService", CardService);
}