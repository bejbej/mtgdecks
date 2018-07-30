module app {

    class DecksController {
        
        // Data
        visibleDecks: IDeckQueryResult[];
        tags: string[];
        tagOptions: string[] = [undefined, null];
        currentTagOptionIndex: string = "0";
        currentTag: string;
        currentTagName: string;
        private decks: IDeckQueryResult[];

        // State Tracking
        isLoading: boolean;

        // Subscriptions
        private authSubscription: ISubscription;
        private decksSubscription: ICancellable<any>;

        constructor(
            private $scope: ng.IScope,
            private authService: AuthService,
            private config: IConfig,
            private deckService: DeckService) {

            this.authSubscription = this.authService.subscribe(this.sync);
            this.$scope.$on("$destroy", this.destroy);
            this.sync();

            var tagState = <ITagState>JSON.parse(localStorage.getItem(this.config.localStorage.tags));
            if (tagState) {
                this.tags = tagState.all;
                this.currentTag = tagState.current;
                this.tagOptions = [undefined, null].concat(this.tags);
                this.currentTagOptionIndex = this.tagOptions.indexOf(this.currentTag).toString();
            }
            this.onCurrentTagChanged();
        }

        onCurrentTagOptionIndexChanged = () => {
            this.currentTag = this.tagOptions[this.currentTagOptionIndex];
            this.onCurrentTagChanged();
            this.onTagStateChanged();
            this.filterDecks();
        }
    
        private loadDecks = () => {
            let user = this.authService.getAuthUser();
            if (!user) {
                return;
            }

            this.isLoading = true;
            this.decksSubscription = this.deckService.getDecksByQuery({ owner: user.id });
            this.decksSubscription.promise
                .then(decks => {
                    this.decks = decks.sort((a, b) => a.name > b.name ? 1 : -1);
                    this.onDecksChanged();
                })
                .finally(() => {
                    delete this.decksSubscription;
                    this.isLoading = false;
                });
        }
    
        private onDecksChanged = () => {
            this.tags = app.Dictionary.toArray<string>(<any>this.decks.reduce((dictionary, deck) => {
                deck.tags.forEach(tag => {
                    dictionary[tag] = tag;
                });
                return dictionary;
            }, {})).sort();
            this.tagOptions = [undefined, null].concat(this.tags);
            let index = this.tagOptions.indexOf(this.currentTag);
            if (index === -1) {
                this.currentTagOptionIndex = "0";
                delete this.currentTag;
                this.onCurrentTagChanged();
            }
            else {
                this.currentTagOptionIndex = index.toString();
            }
            this.onTagStateChanged();
            this.filterDecks();
        }

        private onTagStateChanged = () => {
            if (!this.authService.getAuthUser()) {
                return;
            }

            let tagState = {
                all: this.tags,
                current: this.currentTag
            };
    
            localStorage.setItem(this.config.localStorage.tags, JSON.stringify(tagState));
        }

        private filterDecks = () => {
            if (!this.decks || this.decks.length === 0) {
                delete this.visibleDecks;
                return;
            }
    
            switch (this.currentTag) {
                case undefined:
                    this.visibleDecks = this.decks;
                    break;
                case null:
                    this.visibleDecks = this.decks.filter(deck => deck.tags.length === 0);
                    break;
                default:
                    this.visibleDecks = this.decks.filter(deck => deck.tags.indexOf(this.currentTag) > -1);
            }
        }
        
        private onCurrentTagChanged = () => {
            this.currentTagName = this.currentTag === undefined ? "All" : this.currentTag === null ? "Untagged" : this.currentTag;
        }
    
        private sync = () => {
            let authUser = this.authService.getAuthUser();
    
            if (!authUser) {
                delete this.decks;
                delete this.visibleDecks;
                delete this.currentTag;
                this.tags = [];
                this.onCurrentTagChanged();
                if (this.decksSubscription) {
                    this.decksSubscription.cancel();
                    delete this.decksSubscription;
                }
            }
            else if (!this.decksSubscription && !this.decks) {
                this.loadDecks();
            }
        }

        private destroy = () => {
            this.authSubscription.unsubscribe();

            if (this.decksSubscription) {
                this.decksSubscription.cancel();
                delete this.decksSubscription;
            }
        }
    }

    angular.module("app").controller("decksController", DecksController);
}