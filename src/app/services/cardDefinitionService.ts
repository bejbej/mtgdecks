module app {
    export class CardDefinitionService {

        private cards: { [id: string]: ICardDefinition };

        constructor() {
            this.cards = cardsCSV.split("\n").slice(1).reduce<{ [id: string]: ICardDefinition }>((dictionary, cardText) => {
                var parameters = cardText.split("\t");
                var card = {
                    name: parameters[0],
                    primaryType: parameters[1],
                    cmc: Number(parameters[2]),
                    color: parameters[3],
                    imageUri: parameters[4]
                };
                dictionary[card.name.toLowerCase()] = card;
                return dictionary;
            }, {});
        }

        getCards = () => this.cards;
    }

    angular.module("app").service("cardDefinitionService", CardDefinitionService);
}