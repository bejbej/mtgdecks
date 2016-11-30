module app {
    export interface IApiCard {
        name: string;
        types: string[];
        colors: string[];
        cmc: number;
        editions: {
            multiverse_id: number;
        }[];
        store_url: string;
    }
}