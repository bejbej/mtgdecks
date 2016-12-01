module app {
    export class DeckService {

        private url: string;

        constructor(
            config: IConfig,
            private $http: ng.IHttpService,
            private $q: ng.IQService,
            private DeckFactory: DeckFactory,
            private CardGroupFactory: CardGroupFactory) {

            this.url = config.decksUrl;
        }

        public getDeck = (id): ng.IPromise<Deck> => {
            var deferred = this.$q.defer();

            this.$http.get<IApiDeck>(this.url + "/" + id).then(response => {
                deferred.resolve(this.mapApiDeck(response.data));
            });

            return deferred.promise;
        }

        public getDecksByQuery = (query): ng.IPromise<IDeckQueryResult[]> => {
            var deferred = this.$q.defer();

            this.$http.get<IDeckQueryResults>(this.url).then(response => {
                deferred.resolve(response.data.results);
            });

            return deferred.promise;
        }

        public createDeck = (deck: Deck): ng.IPromise<number> => {
            var deferred = this.$q.defer();

            var payload = {
                name: deck.name,
                data: {
                    cardGroups: deck.cardGroups.map(cardGroup => {
                        return {
                            name: cardGroup.name,
                            cards: cardGroup.getCards()
                        };
                    })
                }
            };

            this.$http.post<{id:number}>(this.url, payload).then(response => {
                deferred.resolve(response.data.id);
            });

            return deferred.promise;
        }

        public updateDeck = (deck: Deck): ng.IPromise<any> => {
            var deferred = this.$q.defer();

            var payload = {
                name: deck.name,
                data: {
                    cardGroups: deck.cardGroups.map(cardGroup => {
                        return {
                            name: cardGroup.name,
                            cards: cardGroup.getCards()
                        };
                    })
                }
            };

            this.$http.put(this.url + "/" + deck.id, payload).then(() => {
                deferred.resolve();
            });

            return deferred.promise;
        }

        public deleteDeck = (id: number): ng.IPromise<any> => {
            var deferred = this.$q.defer();

            this.$http.delete(this.url + "/" + id).then(() => {
                deferred.resolve();
            });

            return deferred.promise;
        }

        private mapApiDeck = (apidata: IApiDeck): Deck => {
            var deck = this.DeckFactory.createDeck();
            deck.id = apidata.id;
            deck.name = apidata.name;
            deck.cardGroups = apidata.data.cardGroups.map(apiCardGroup => {
                var cardGroup = this.CardGroupFactory.createCardGroup();
                cardGroup.name = apiCardGroup.name;
                cardGroup.setCards(apiCardGroup.cards);
                return cardGroup;
            });
            return deck;
        }
    }

    angular.module("app").service("DeckService", DeckService);
}