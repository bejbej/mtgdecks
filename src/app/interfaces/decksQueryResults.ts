module app {
    export interface IDeckQueryResult{
        name: string;
        id: number;
        tags: string[];
    }

    export interface IDeckQueryResults {
        results: IDeckQueryResult[];
    }
}