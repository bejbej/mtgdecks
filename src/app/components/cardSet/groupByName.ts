module app {

    interface scope extends ng.IScope {
        columns: CardSet[][];
    }

    class GroupByName implements ng.IDirective {
        
        letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

        private groupByName = (cards: Card[]): CardSet[][] => {

            var cards = cards.sort((a, b) => {
                return a.name > b.name ? 1 : -1;
            });

            var columnLength = Math.ceil(cards.length / 3);

            return [
                [{
                    name: undefined,
                    numberOfCards: undefined,
                    cards: cards.slice(0, columnLength)
                }],
                [{
                    name: undefined,
                    numberOfCards: undefined,
                    cards: cards.slice(columnLength, columnLength + columnLength)
                }],
                [{
                    name: undefined,
                    numberOfCards: undefined,
                    cards: cards.slice(columnLength + columnLength)
                }]
            ];
        } 

        restrict = "E";
        scope = {
            cards: "=",
        };
        templateUrl = "cardSet/groupByName.html";
        link = (scope: scope) => {
            scope.$watchCollection("cards", (cards: Card[]) => {
                scope.columns = this.groupByName(cards);
            })
        }
    }

    angular.module("app").directive("groupByName", () => new GroupByName());
}