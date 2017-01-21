module app {
    export interface IConfig {
        types: string[]
        categories: ICategory[];
        statCategories: ICategory[];
        cardCacheLimit: number;
        authClients: {
            google: {
                authUrl: string;
                clientId: string;
            }
        }
        cardsUrl: string;
        decksUrl: string;
        usersUrl: string;
        imagesUrl: string;
        storeUrl: string;
        enableHover: boolean;
    }
}