module app {
    export class Deck {
        id: number;
        name: string;
        cardGroups: CardGroup[];
        owners: string[];

        constructor(
            private $q: ng.IQService,
            private DeckService: DeckService) { }

        public save = (): ng.IPromise<any> => {
            if (this.id) {
                return this.DeckService.updateDeck(this);
            } else {
                var deferred = this.$q.defer();

                this.DeckService.createDeck(this).then(id => {
                    this.id = id;
                    deferred.resolve();
                }, deferred.reject);

                return deferred.promise;
            }
        }

        public delete = (): ng.IPromise<any> => {
            if (this.id) {
                var deferred = this.$q.defer();

                this.DeckService.deleteDeck(this.id).then(() => {
                    this.id = undefined;
                    deferred.resolve();
                }, deferred.reject);

                return deferred.promise;
            } else {
                return this.$q.reject();
            }
        }
    }
}