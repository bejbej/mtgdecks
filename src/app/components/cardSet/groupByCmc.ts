module app {

    interface scope extends ng.IScope {
        columns: CardSet[][];
    }

    class GroupByCmc implements ng.IDirective {
        
        private groupByCmc = (cards: ICard[]): CardSet[][] => {

            var sets = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

            var cardSets = sets.reduce((array, cmc) => {
                var cardSet = new CardSet();
                cardSet.name = cmc.toString() + " drop";
                cardSet.cards = cards.filter(card => {
                    return card.definition.cmc === cmc;
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
            scope.$watchCollection("cards", (cards: ICard[]) => {
                scope.columns = this.groupByCmc(cards);
            })
        }
    }

    angular.module("app").directive("groupByCmc", () => new GroupByCmc());
}