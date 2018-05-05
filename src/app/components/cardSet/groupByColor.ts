module app {

    interface scope extends ng.IScope {
        cardgroup: CardGroup;
        columns: CardSet[][];
    }

    class GroupByColor implements ng.IDirective {
        
        private groupByColor = (cards: ICard[]): CardSet[][] => {

            var colors = ["white", "blue", "black", "red", "green", "multicolored", "colorless"];

            var cardSets = colors.reduce((array, color) => {
                var cardSet = new CardSet();
                cardSet.name = color;
                cardSet.cards = cards.filter(card => {
                    return card.definition.color === color;
                });
                cardSet.numberOfCards = cardSet.cards.reduce((count, card) => {
                    return count + card.quantity;
                }, 0);

                if (cardSet.cards.length > 0) {
                    array.push(cardSet);
                }

                return array;
            }, []);

            return new GroupEvenly().exec(cardSets, 3, cardSet => {
                // Add extraS to the size to account for the header
                return cardSet.cards.length + 4;
            });
        } 

        restrict = "E";
        scope = {
            cardgroup: "="
        };
        templateUrl = "cardSet/groupBy1.html";
        link = (scope: scope) => {
            scope.columns = this.groupByColor(scope.cardgroup.cards);
        }
    }

    angular.module("app").directive("groupByColor", () => new GroupByColor());
}