module app {
    export class CardService {

        constructor(
            private config: IConfig,
            private $http: ng.IHttpService,
            private $q: ng.IQService,
            private CardCacheService: CardCacheService,
            private CardFactory: CardFactory) { }

        getCards = (names: string[]): ng.IPromise<Card[]> => {
            var result = this.CardCacheService.get(names);

            if (result.failedNames.length === 0) {
                return this.$q.when(result.cards);
            }

            var deferred = this.$q.defer();

            var url = this.config.cardsUrl + "?" + result.failedNames.map(name => {
                return "name=" + name.replace(/ /g, "+");
            }).join("&");

            this.$http.get<IApiCard[]>(url).then(response => {
                var cards = response.data.map(this.mapApiCard);
                this.CardCacheService.add(cards);
                deferred.resolve(result.cards.concat(cards));
            }, deferred.reject);

            return deferred.promise;
        }

        private mapApiCard = (apiData: IApiCard): Card => {
            var card = this.CardFactory.createCard();
            return angular.merge(card, apiData);
        }
    }

    angular.module("app").service("CardService", CardService);
}