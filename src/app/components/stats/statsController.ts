module app {
    class StatsController {

        stats: { value: string }[];

        private static cardTypes = app.Dictionary.fromArray(["creature", "artifact", "enchantment", "planeswalker", "instant", "sorcery"], x => x);

        constructor($scope: ng.IScope, config: IConfig) {
            $scope.$watchCollection("cards", this.updateStats);
        }

        private updateStats = (cards: ICard[]) => {
            if (!cards) {
                delete this.stats;
                return;
            }
    
            let stats = new Array(17).fill(0);
    
            cards.forEach(card => {
                if (StatsController.cardTypes[card.definition.primaryType] === undefined) {
                    return;
                }
    
                stats[card.definition.cmc] += card.quantity;
            });
    
            for (var i = stats.length - 1; i > -1 && stats[i] === 0; --i) {
                stats.pop();
            }
    
            this.stats = stats.map(stat => {
                return {
                    value: new Array(stat).fill("X").join("")
                }
            });
        }
    }

    angular.module("app").controller("statsController", StatsController);
}