module app {

    interface scope extends ng.IScope {
        cardgroup: CardGroup;
        columns: CardSet[][];
    }

    class GroupByPrice implements ng.IDirective {
        
        private groupByPrice = (cards: ICard[]): CardSet[][] => {

            var cards = cards.slice(0).sort((a, b) => {
                if (Math.round(a.usd * 100) === Math.round(b.usd * 100)) {
                    return a.definition.name > b.definition.name ? 1 : -1;
                }

                return a.usd > b.usd ? 1 : -1;
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
            let cardGroup = scope.cardgroup;
            let sort = () => scope.columns = this.groupByPrice(cardGroup.cards);
            cardGroup.on("prices-changed", sort);
            scope.$on("$destroy", () => cardGroup.unsubscribe("prices-changed", sort));
            cardGroup.loadPrices();
            sort();
        }
    }

    angular.module("app").directive("groupByPrice", () => new GroupByPrice());
}