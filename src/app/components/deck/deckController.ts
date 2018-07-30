module app {

    interface IRouteParams {
        id: string;
    }

    class DeckController {

        // Data
        deck: IDeck;
        statCards: ICard[];
        private cardGroupsThatAreLoadingPrices: ICardGroup[] = [];

        // State Tracking
        isSaving: boolean;
        isDeleting: boolean;
        isLoading: boolean;
        isLoadingPrices: boolean;
        isDirty: boolean;
        canWrite: boolean;
        showPrices: boolean;

        // Emitters
        loadPrices: IBroadcaster<void> = new Arbiter<void>();

        // Listeners
        cardGroupChanged: ISubscriber<ICardGroup> = new Arbiter<ICardGroup>();
        pricesLoaded: ISubscriber<ICardGroup> = new Arbiter<ICardGroup>();
        cardsChanged: ISubscriber<ICardGroupData> = new Arbiter<ICardGroupData>();

        // Subscriptions
        private deckSubscription: ICancellable<IDeck>;
        private authSubscription: ISubscription;

        constructor(
            $routeParams: IRouteParams,
            private $location: any,
            private $q: ng.IQService,
            private $scope: ng.IScope,
            private config: IConfig,
            private authService: AuthService,
            private deckService: DeckService) {

            this.isLoading = true;
            this.loadDeck($routeParams.id)
                .then(() => {
                    this.sync();
                    this.updateTitle();
                })
                .finally(() => this.isLoading = false)

            this.authSubscription = this.authService.subscribe(this.sync);
            this.$scope.$on("$destroy", this.destroy);
            this.pricesLoaded.subscribe(this.onPricesLoaded);
            this.cardGroupChanged.subscribe(this.save);
            this.cardsChanged.subscribe(this.onCardsChanged)
        }

        togglePrices = () => {
            this.showPrices = !this.showPrices;
            if (this.showPrices) {
                this.isLoadingPrices = true;
                this.cardGroupsThatAreLoadingPrices = this.deck.cardGroups.slice();
                this.loadPrices.broadcast();
            }
        }

        onTagsChanged = () => {
            this.deck.tags = this.deck.tags.map(x => x.toLowerCase());
            this.save();
        }

        delete = () => {
            if (!confirm("Are you sure you want to delete this deck?")) {
                return;
            }
    
            this.isDeleting = true;
            this.deckService.deleteDeck(this.deck.id)
                .then(() => this.$location.path("/decks"))
                .finally(() => this.isDeleting = false);
        }

        private onCardsChanged = (cardGroupData: ICardGroupData) => {
            if (this.showPrices) {
                this.loadPrices.broadcast();
            }

            if (this.deck.cardGroups.indexOf(cardGroupData.cardGroup) === 0) {
                this.statCards = cardGroupData.cards;
            }
        }

        private onPricesLoaded = (cardGroup: ICardGroup) => {
            let index = this.cardGroupsThatAreLoadingPrices.indexOf(cardGroup);
            if (index > -1) {
                this.cardGroupsThatAreLoadingPrices.splice(index, 1);
            }

            if (this.cardGroupsThatAreLoadingPrices.length === 0) {
                this.isLoadingPrices = false;
            }
        }

        private updateTitle = () => {
            document.title = this.deck.name;
        }

        private sync = () => {
            var authUser = this.authService.getAuthUser();
            if (!this.deck.id && authUser) {
                this.deck.owners = [authUser.id];
            }
            this.canWrite = authUser && this.deck.owners.indexOf(authUser.id) > -1;
            if (this.canWrite && this.isDirty) {
                this.save();
            }
        }

        private save = () => {
            this.isDirty = true;
            let authUser = this.authService.getAuthUser();

            if (!authUser) {
                return;
            }

            this.isSaving = true;
            return this.deck.id ? this.updateDeck() : this.createDeck();
        }

        private updateDeck = () => {
            return this.deckService.updateDeck(this.deck)
                .then(() => this.isDirty = false)
                .finally(() => this.isSaving = false);
        }

        private createDeck = () => {
            return this.deckService.createDeck(this.deck)
                .then(id => {
                    this.deck.id = id;
                    this.isDirty = false;
                    this.$location.update_path("/decks/" + this.deck.id);
                })
                .finally(() => this.isSaving = false);
        }

        private loadDeck = (id: string): ng.IPromise<IDeck> => {
            if (id === "new") {
                this.deck = this.newDeck();
                return this.$q.when(this.deck);
            }

            document.title = "Loading";
            this.deckSubscription = this.deckService.getDeck(id);
            return this.deckSubscription.promise
                .then(deck => this.deck = deck)
                .finally(() => delete this.deckSubscription);
        }

        private newDeck = () => {
            let tagState = <ITagState>JSON.parse(localStorage.getItem(this.config.localStorage.tags));
            let tags = tagState && tagState.current ? [tagState.current] : [];

            return {
                cardGroups: [{
                    name: "Mainboard",
                    cardBlob: ""
                },
                {
                    name: "Sideboard",
                    cardBlob: ""
                }],
                id: undefined,
                name: "New Deck",
                notes: "",
                owners: [],
                tags: tags
            };
        }

        private destroy = () => {
            this.authSubscription.unsubscribe();
            if (this.deckSubscription) {
                this.deckSubscription.cancel();
                delete this.deckSubscription;
            }
        }
    }

    angular.module("app").controller("deckController", DeckController);
}