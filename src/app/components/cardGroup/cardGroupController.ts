module app {

    interface scope extends ng.IScope {
        data: ICardGroup;
        isEditing: string;
        shouldLoadPrices: ISubscriber<void>;
        cardGroupChanged: IBroadcaster<ICardGroup>;
        cardsChanged: IBroadcaster<ICardGroupData>;
        pricesLoaded: IBroadcaster<ICardGroup>;
    }

    class CardGroupController {

        // Data
        cardGroup: ICardGroup;
        cards: ICard[];
        cardBlob: string;
        cardView: ICardSet[][];
        count: number = 0;
        canEdit: boolean;
        invalidCards: string[];
        usd: number;
        cardGrouper: CardGrouper = CardGrouper;
        private groupFunc: (cards: ICard[]) => ICardSet[][];

        // State Tracking
        isEditing: boolean;
        showToolbar: boolean;
        showHeaders: boolean;
        private isLoadingPrices: boolean;

        // Emitters
        private cardGroupChanged: IBroadcaster<ICardGroup>;
        private cardsChanged: IBroadcaster<ICardGroupData>;
        private pricesLoaded: IBroadcaster<ICardGroup>;

        // Subscriptions
        private cardPriceSubscription: ICancellable<ICardPrice[]>;
        private loadPriceSubscription: ISubscription;

        constructor(
            private $scope: scope,
            private cardDefinitionService: CardDefinitionService,
            private cardPriceService: CardPriceService) {

            this.cardGroup = this.$scope.data;
            this.cardGroupChanged = this.$scope.cardGroupChanged;
            this.cardsChanged = this.$scope.cardsChanged;
            this.pricesLoaded = this.$scope.pricesLoaded;
            this.isEditing = this.$scope.isEditing === "true";

            this.$scope.$on("$destroy", this.destroy);
            this.loadPriceSubscription = this.$scope.shouldLoadPrices.subscribe(this.loadPrices);

            this.cardBlob = this.cardGroup.cardBlob;
            this.groupFunc = CardGrouper.groupByType;
            this.showHeaders = true;
            this.parseCardBlob();
            this.onCardsChanged();
        }

        setGroupFunc = (func: (cards: ICard[]) => ICardSet[][]) => {
            this.showToolbar = false;
            this.groupFunc = func;
            this.showHeaders = this.groupFunc !== CardGrouper.groupByName && this.groupFunc !== CardGrouper.groupByPrice;
            this.onCardViewChanged();
            if (func === CardGrouper.groupByPrice) {
                this.loadPrices();
            }
        }

        startEditing = () => {
            this.isEditing = true;
            this.showToolbar = false;
            this.cardBlob = this.cardGroup.cardBlob;
        }

        applyChanges = () => {
            if (!this.isEditing) {
                return;
            }

            this.isEditing = false;

            if (this.cardBlob === this.cardGroup.cardBlob) {
                return;
            }

            this.parseCardBlob();

            if (this.cardBlob === this.cardGroup.cardBlob) {
                return;
            }

            this.cardGroup.cardBlob = this.cardBlob;
            this.onCardGroupChanged();
            this.onCardsChanged();
        }

        discardChanges = () => {
            if (!this.isEditing) {
                return;
            }

            this.isEditing = false;
        }

        private parseCardBlob = () => {
            this.cardBlob = this.cardBlob.trim();

            this.cards = [];
            this.invalidCards = [];

            if (this.cardBlob.length === 0) {
                return;
            }

            let cardDict: { [id: string]: ICard } = {};

            this.cardBlob.split(/\n[\s\n]*/).forEach(line => {
                var result = /^(?:(\d+)[Xx]?\s)?\s*([^0-9]+)$/.exec(line.trim());
                if (!result) {
                    this.invalidCards.push(line);
                    return;
                }

                let cardDefinition = this.cardDefinitionService.getCards()[result[2].toLowerCase()];
                if (!cardDefinition) {
                    this.invalidCards.push(line);
                    return;
                }

                let card = cardDict[cardDefinition.name] = cardDict[cardDefinition.name] || { definition: cardDefinition, quantity: 0, usd: undefined };

                card.quantity += Number(result[1]) || 1;
            });

            this.cards = app.Dictionary.toArray(cardDict);
            this.count = this.cards.reduce((sum, card) => sum + card.quantity, 0);
            this.cardBlob = this.invalidCards.concat(this.cards.sort((a, b) => a.definition.name > b.definition.name ? 1 : -1).map(card => {
                return card.quantity + "x " + card.definition.name;
            })).join("\n");
        }

        private loadPrices = () => {
            if (this.isLoadingPrices) {
                return;
            }

            let cardNamesWithoutUsd = this.cards.filter(card => !card.usd).map(card => card.definition.name);

            if (cardNamesWithoutUsd.length === 0) {
                this.onPricesLoaded();
                return;
            }

            this.isLoadingPrices = true;
            this.cardPriceSubscription = this.cardPriceService.getCardPrices(cardNamesWithoutUsd);
            this.cardPriceSubscription.promise
                .then(cardPrices => {
                    let cardPricesDict = app.Dictionary.fromArray(cardPrices, card => card.name);
                    this.cards.forEach(card => {
                        if (card.usd === undefined) {
                            let cardPrice = cardPricesDict[card.definition.name.toLowerCase()];
                            card.usd = cardPrice ? Number(cardPrice.usd) * card.quantity : null;
                        }
                    });
                    this.usd = this.cards.reduce((sum, card) => sum + card.usd, 0);

                    this.isLoadingPrices = false;
                    this.onPricesLoaded();
                    this.onPricesChanged();
                })
                .finally(() => delete this.cardPriceSubscription);
        }

        private destroy = () => {
            if (this.cardPriceSubscription) {
                this.cardPriceSubscription.cancel();
                delete this.cardPriceSubscription;
            }
            this.loadPriceSubscription.unsubscribe();
        }

        private onPricesChanged = () => {
            this.onCardViewChanged();
        }

        private onPricesLoaded = () => {
            this.pricesLoaded.broadcast(this.cardGroup);
        }

        private onCardGroupChanged = () => {
            this.cardGroupChanged.broadcast(this.cardGroup);
        }

        private onCardsChanged = () => {
            this.cardsChanged.broadcast({ cardGroup: this.cardGroup, cards: this.cards });
            this.onCardViewChanged();
        }

        private onCardViewChanged = () => {
            this.cardView = this.groupFunc(this.cards);
        }
    }

    angular.module("app").controller("CardGroupController", CardGroupController);

}