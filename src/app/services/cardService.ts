module app {
    export class CardService {
        private url: string;
        private cache: { [id: string] : Card; };
        private types: string[];

        constructor(
            config,
            private $http: ng.IHttpService,
            private $q: ng.IQService,
            private CardCacheService: CardCacheService) {
            
            this.cache = {};
            this.url = config.cardsUrl;
            this.types = config.types;
        }

        getCards = (names: string[]): ng.IPromise<Card[]> => {
            var cachedCards = [];
            var unknownNames = names.filter(name => {
                var cachedCard = this.CardCacheService.get(name);
                if (cachedCard === undefined) {
                    return true;
                } else {
                    cachedCards.push(cachedCard);
                    return false;
                }
            });

            if (unknownNames.length === 0) {
                return this.$q.when(cachedCards);
            }

            var deferred = this.$q.defer();

            var url = this.url + "?" + unknownNames.map(name => {
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
            var card = new Card();
            card.name = apiData.name;
            card.cmc = apiData.cmc;
            card.primaryType = this.types.filter(type => {
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