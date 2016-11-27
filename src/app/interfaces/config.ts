module app {
    export interface IConfig {
        types: string[]
        categories: ICategory[];
        statCategories: ICategory[];
        cardsUrl: string;
        decksUrl: string;
        imagesUrl: string;
        storeUrl: string;
    }
}