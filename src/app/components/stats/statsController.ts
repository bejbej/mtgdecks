module app {
    class StatsController {

        private statGroups: StatGroup[];
        private categories: ICategory[];

        constructor($scope: ng.IScope, config: IConfig) {
            this.categories = config.statCategories;
            $scope.$watchCollection("cards", this.updateStats);
        }

        unique = function (value, index, self) {
            return self.indexOf(value) === index;
        };

        createStatGroup = (cards: Card[], category: ICategory): StatGroup => {
            var statGroup = new StatGroup();
            statGroup.name = category.name;

            var filteredCards = cards.filter(card => {
                return category.types.indexOf(card.primaryType) >= 0;
            });

            var cmcs = filteredCards.map(card => {
                return card.cmc;
            }).filter(this.unique).sort();

            statGroup.stats = [];
            for (var i = 0; i <= cmcs[cmcs.length - 1]; ++i) {
                var stat = new Stat();
                stat.name = i.toString();
                stat.value = filteredCards.filter(card => {
                    return card.cmc === i;
                }).reduce((a, b) => {
                    return a + Number(b.quantity);
                }, 0);
                statGroup.stats.push(stat);
            }

            return statGroup;
        }

        createStatGroups = (cards: Card[], categories: ICategory[]): StatGroup[] => {
            return categories.map(category => {
                return this.createStatGroup(cards, category);
            });
        }

        updateStats = (cards: Card[], x, y) => {
            if (cards) {
                this.statGroups = this.createStatGroups(cards, this.categories);
            } else {
                this.statGroups = [];
            }
        }
    }

    angular.module("app").controller("StatsController", StatsController);
}