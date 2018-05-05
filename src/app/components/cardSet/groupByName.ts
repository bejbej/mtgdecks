module app {

    interface scope extends ng.IScope {
        cardgroup: CardGroup;
        columns: CardSet[][];
    }

    class GroupByName implements ng.IDirective {
        
        private groupByName = (cards: ICard[]): CardSet[][] => {

            var cards = cards.slice(0).sort((a, b) => {
                return a.definition.name > b.definition.name ? 1 : -1;
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
            cardgroup: "="
        };
        templateUrl = "cardSet/groupBy2.html";
        link = (scope: scope) => {
            scope.columns = this.groupByName(scope.cardgroup.cards);
        }
    }

    angular.module("app").directive("groupByName", () => new GroupByName());
}