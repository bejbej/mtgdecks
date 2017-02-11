module app {
    export class DeckService {

        private url: string;

        constructor(
            config: IConfig,
            private $http: ng.IHttpService,
            private DeckFactory: DeckFactory,
            private CardGroupFactory: CardGroupFactory) {

            this.url = config.decksUrl;
        }

        public getDeck = (id, timeout?: ng.IPromise<any>): ng.IPromise<Deck> => {
            return this.$http.get<IApiDeck>(this.url + "/" + id, { timeout: timeout }).then(response => {
                return this.mapApiDeck(response.data);
            });
        }

        public getDecksByQuery = (query, timeout?: ng.IPromise<any>): ng.IPromise<IDeckQueryResult[]> => {
            return this.$http.get<IDeckQueryResults>(this.url, { params: query, timeout: timeout }).then(response => {
                return response.data.results;
            });
        }

        public createDeck = (deck: Deck): ng.IPromise<number> => {
            var payload = {
                name: deck.name,
                cardGroups: deck.cardGroups.map(cardGroup => {
                    return {
                        name: cardGroup.name,
                        cardBlob: cardGroup.getCardBlob()
                    };
                })
            };

            return this.$http.post<{id:number}>(this.url, payload).then(response => {
                return response.data.id;
            });
        }

        public updateDeck = (deck: Deck): ng.IPromise<any> => {
            var payload = {
                name: deck.name,
                cardGroups: deck.cardGroups.map(cardGroup => {
                    return {
                        name: cardGroup.name,
                        cardBlob: cardGroup.getCardBlob()
                    };
                })
            };

            return this.$http.put(this.url + "/" + deck.id, payload);;
        }

        public deleteDeck = (id: number): ng.IPromise<any> => {
            return this.$http.delete(this.url + "/" + id);
        }

        private mapApiDeck = (apidata: IApiDeck): Deck => {
            var deck = this.DeckFactory.createDeck();
            deck.id = apidata.id;
            deck.name = apidata.name;
            deck.owners = apidata.owners;
            deck.cardGroups = apidata.cardGroups.map(apiCardGroup => {
                var cardGroup = this.CardGroupFactory.createCardGroup();
                cardGroup.name = apiCardGroup.name;
                cardGroup.setCardBlob(apiCardGroup.cardBlob);
                return cardGroup;
            });
            return deck;
        }
    }

    angular.module("app").service("DeckService", DeckService);
}