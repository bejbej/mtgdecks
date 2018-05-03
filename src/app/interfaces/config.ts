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
        };
        authClients: {
            google: {
                authUrl: string;
                clientId: string;
            }
        }
        cardCacheLimit: number;
        cardExpirationMs: number;
        cardsUrl: string;
        decksUrl: string;
        usersUrl: string;
        imagesUrl: string;
        enableHover: boolean;
    }
}