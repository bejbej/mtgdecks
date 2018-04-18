module app {
    export interface IConfig {
        types: string[]
        categories: ICategory[];
        statCategories: ICategory[];
        localStorage: {
            prefix: string;
            user: string;
            tags: string;
            cards: string;
            cardsVersion: string;
        };
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
        storeMassEntryUrl: string;
        enableHover: boolean;
    }
}