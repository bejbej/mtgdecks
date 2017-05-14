module app {
    export interface IApiDeck {
        id: number;
        name: string;
        owners: string[];
        cardGroups: {
            name: string;
            cardBlob: string;
        }[];
        notes: string;
        tags: string[];
    }
}