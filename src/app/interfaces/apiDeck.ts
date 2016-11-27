module app {
    export interface IApiDeck {
        id: number;
        name: string;
        data: {
            cardGroups: {
                name: string;
                cards: string;
            }[];
        };
    }
}