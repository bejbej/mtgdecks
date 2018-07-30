module app {
    export interface IDeck {
        name: string;
        id: string;
        owners: string[];
        tags: string[];
        cardGroups: ICardGroup[];
    }
    
    export interface ICardGroup {
        name: string;
        cardBlob: string;
    }
}