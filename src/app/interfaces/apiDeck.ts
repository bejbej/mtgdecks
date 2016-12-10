module app {
    export interface IApiDeck {
        id: number;
        name: string;
        cardGroups: {
            name: string;
            cardBlob: string;
        }[];
    }
}