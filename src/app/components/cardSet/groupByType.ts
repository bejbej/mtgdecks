module app {

    interface scope extends ng.IScope {
        cardgroup: CardGroup;
        columns: CardSet[][];
    }

    class GroupByType implements ng.IDirective {
        
        private groupByType = (cards: ICard[]): CardSet[][] => {
            var types = ["creature", "artifact", "enchantment", "planeswalker", "land", "instant", "sorcery"];

            var cardSets = types.reduce((array, type) => {
                var cardSet = new CardSet();
                cardSet.name = type;
                cardSet.cards = cards.filter(card => {
                    return card.definition.primaryType === type;
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
                return cardSet.cards.length + 4;
            });
        }

        restrict = "E";
        scope = {
            cardgroup: "=",
        };
        templateUrl = "cardSet/groupBy1.html";
        link = (scope: scope) => {
            scope.columns = this.groupByType(scope.cardgroup.cards);
        }
    }

    angular.module("app").directive("groupByType", () => new GroupByType());
}