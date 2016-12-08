module app {

    interface scope extends ng.IScope {
        columns: CardSet[][];
    }

    class GroupByCmc implements ng.IDirective {
        
        private groupByCmc = (cards: Card[]): CardSet[][] => {
            var columns = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
            ];

            return columns.map(column => {
                return column.reduce((array, cmc) => {
                    var cardSet = new CardSet();
                    cardSet.name = cmc.toString() + " drop";
                    cardSet.cards = cards.filter(card => {
                        return card.cmc === cmc;
                    });
                    cardSet.numberOfCards = cardSet.cards.reduce((count, card) => {
                        return count + card.quantity;
                    }, 0);

                    if (cardSet.cards.length > 0) {
                        array.push(cardSet);
                    }

                    return array;
                }, []);
            });
        }

        restrict = "E";
        scope = {
            cards: "=",
        };
        templateUrl = "cardSet/cardSet.html";
        link = (scope: scope) => {
            scope.$watchCollection("cards", (cards: Card[]) => {
                scope.columns = this.groupByCmc(cards);
            })
        }
    }

    angular.module("app").directive("groupByCmc", () => new GroupByCmc());
}