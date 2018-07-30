module app {
    export class DeckService {

        private url: string;

        constructor(
            config: IConfig,
            private $q: ng.IQService,
            private $http: ng.IHttpService) {

            this.url = config.decksUrl;
        }

        public getDeck = (id: string): ICancellable<IDeck> => {
            let timeout = this.$q.defer();
            let promise = this.$http.get<IDeck>(this.url + "/" + id, { timeout: timeout }).then(response => {
                return response.data;
            });

            return {
                cancel: () => timeout.resolve(),
                promise: promise
            };
        }

        public getDecksByQuery = (query): ICancellable<any[]> => {
            let timeout = this.$q.defer();
            let promise = this.$http.get<IDeckQueryResults>(this.url, { params: query, timeout: timeout }).then(response => {
                return response.data.results;
            });

            return {
                cancel: () => timeout.resolve(),
                promise: promise
            };
        }

        public createDeck = (deck: IDeck): ng.IPromise<string> => {
            return this.$http.post<{ id: string }>(this.url, deck).then(response => response.data.id);
        }

        public updateDeck = (deck: IDeck): ng.IPromise<any> => {
            let url = this.url + "/" + deck.id;
            return this.$http.put(url, deck);
        }

        public deleteDeck = (id: string): ng.IPromise<any> => {
            let url = this.url + "/" + id;
            return this.$http.delete(url);
        }
    }

    angular.module("app").service("deckService", DeckService);
}