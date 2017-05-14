module app {

    class DecksController {

        private decks: IDeckQueryResult[];
        private visibleDecks: IDeckQueryResult[];
        private timeout: ng.IDeferred<any>;
        private tags: string[];
        private currentTag: string;

        constructor(
            private $q: ng.IQService,
            private $scope,
            private AuthService: AuthService,
            private config: IConfig,
            private DeckService: DeckService) {

            this.sync();
            this.$scope.$on("authentication-changed", this.sync);
            this.$scope.$on("$destroy", this.cancelPendingRequests);

            var tags = <ITags>JSON.parse(localStorage.getItem(this.config.localStorage.tags));
            if (tags) {
                this.tags = tags.all;
                this.currentTag = tags.current;
            }
        }

        getDecks = () => {
            this.timeout = this.$q.defer();

            var user = this.AuthService.getAuthUser();
            this.DeckService.getDecksByQuery({ owner: user.id }, this.timeout.promise).then(decks => {
                this.decks = decks.sort((a, b) => {
                    return a.name > b.name ? 1 : -1;
                });

                this.tags = decks.reduce((tags, deck) => {
                    deck.tags.forEach(tag => {
                        tag = tag.toLocaleLowerCase();
                        if (tags.indexOf(tag) === -1) {
                            tags.push(tag);
                        }
                    });
                    return tags;
                }, []);

                if (this.tags.indexOf(this.currentTag) < 0) {
                    delete this.currentTag;
                }

                this.filterDecks();
            }).finally(() => {
                delete this.timeout;
            });
        }

        filterDecks = () => {
            this.syncTags();

            if (!this.currentTag) {
                this.visibleDecks = this.decks;
                return;
            }

            this.visibleDecks = this.decks.filter(deck => {
                return deck.tags.some(tag => {
                    return tag.toLocaleLowerCase() === this.currentTag.toLocaleLowerCase();
                });
            });
        }

        sync = () => {
            var authUser = this.AuthService.getAuthUser()

            if (authUser === undefined) {
                this.cancelPendingRequests();
                delete this.decks;
                delete this.visibleDecks;
                delete this.tags;
                delete this.currentTag;
            }

            if (authUser !== undefined) {
                if (this.decks === undefined) {
                    this.getDecks();
                }
            }
        }

        syncTags = () => {
            if (this.tags === undefined) {
                localStorage.removeItem(this.config.localStorage.tags);
            }
                var tags: ITags = {
                all: this.tags,
                current: this.currentTag
            };
            localStorage.setItem(this.config.localStorage.tags, JSON.stringify(tags));
        }

        cancelPendingRequests = () => {
            console.log("cancelling");            
            if (this.timeout) {
                this.timeout.resolve();
            }
        }
    }

    angular.module("app").controller("DecksController", DecksController);
}