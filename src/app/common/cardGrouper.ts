module app {
    export class CardGrouper {
        static groupByType = (cards: ICard[]): ICardSet[][] => {
            return CardGrouper.groupEvenly(CardGrouper.groupBy(
                ["creature", "artifact", "enchantment", "planeswalker", "land", "instant", "sorcery"],
                x => x,
                card => card.definition.primaryType,
                cards
            ));
        }

        static groupByCmc = (cards: ICard[]): ICardSet[][] => {
            return CardGrouper.groupEvenly(CardGrouper.groupBy(
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
                x => x + " drop",
                card => card.definition.cmc,
                cards
            ));
        }

        static groupByColor = (cards: ICard[]): ICardSet[][] => {
            return CardGrouper.groupEvenly(CardGrouper.groupBy(
                ["white", "blue", "black", "red", "green", "multicolored", "colorless"],
                x => x,
                card => card.definition.color,
                cards
            ));
        }

        static groupByName = (cards: ICard[]): ICardSet[][] => {
            cards = cards.slice().sort((a, b) => {
                return a.definition.name > b.definition.name ? 1 : -1;
            });

            let columnLength = Math.ceil(cards.length / 3);

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

        static groupByPrice = (cards: ICard[]): ICardSet[][] => {
            cards = cards.slice().sort((a, b) => {
                return a.usd > b.usd ? 1 : -1;
            });

            let columnLength = Math.ceil(cards.length / 3);

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

        private static groupBy = (
            keys: any[],
            headerFunc: (key: string) => string,
            keyFunc: (card: ICard) => string | number,
            cards: ICard[]): ICardSet[] => {

            let cardDictionary = cards.reduce<{ [id: string]: ICard[] }>((dictionary, card) => {
                let key = keyFunc(card);
                dictionary[key] = dictionary[key] || [];
                dictionary[key].push(card);
                return dictionary;
            }, {});

            return keys.reduce<ICardSet[]>((array, key) => {
                let cards = cardDictionary[key] || [];

                if (cards && cards.length > 0) {
                    cards = cards.sort((a, b) => a.definition.name > b.definition.name ? 1 : -1);
                    array.push({
                        name: headerFunc(key),
                        cards: cards,
                        numberOfCards: cards.reduce((sum, card) => sum + card.quantity, 0)
                    });
                }

                return array;
            }, []);
        }

        private static groupEvenly = (cardSets: ICardSet[]): ICardSet[][] => {
            return app.GroupEvenly.exec(cardSets, 3, (cardGroup) => {
                return cardGroup.cards.length + 4;
            });
        }
    }
}