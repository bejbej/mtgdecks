module app {
    export interface IDeckQueryResult{
        name: string;
        id: number;
    }

    export interface IDeckQueryResults {
        results: IDeckQueryResult[];
    }
}