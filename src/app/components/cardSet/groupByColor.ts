module app {

    interface scope extends ng.IScope {
        columns: CardSet[][];
    }

    class GroupByColor implements ng.IDirective {
        
        private groupByColor = (cards: Card[]): CardSet[][] => {

            var colors = ["white", "blue", "black", "red", "green", "multicolored", "colorless"];

            var cardSets = colors.reduce((array, color) => {
                var cardSet = new CardSet();
                cardSet.name = color;
                cardSet.cards = cards.filter(card => {
                    return card.color === color;
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
            cards: "=",
        };
        templateUrl = "cardSet/cardSet.html";
        link = (scope: scope) => {
            scope.$watchCollection("cards", (cards: Card[]) => {
                scope.columns = this.groupByColor(cards);
            })
        }
    }

    angular.module("app").directive("groupByColor", () => new GroupByColor());
}