module app {
    export interface IConfig {
        types: string[]
        categories: ICategory[];
        statCategories: ICategory[];
        cardCacheLimit: number;
        cardsUrl: string;
        decksUrl: string;
        imagesUrl: string;
        storeUrl: string;
    }
}