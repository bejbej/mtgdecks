module app {
    export class CardService {

        constructor(
            private CardFactory: CardFactory,
            private cards: Card[]) { }

        getCard = (name: string): Card => {
            var cardData = this.cards[name.toLowerCase()];
            if (cardData === undefined) {
                return null;
            }
            var card = this.CardFactory.createCard();
            return angular.merge(card, cardData);
        }
    }

    angular.module("app").service("CardService", CardService);
}