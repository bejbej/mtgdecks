module app {
    export class Card {
        color: string;
        name: string;
        quantity: number;
        primaryType: string;
        cmc: number;
        multiverseId: number;

        constructor(private config: IConfig) { }

        imageUrl = (): string => {
            return this.config.imagesUrl + this.multiverseId + ".jpg";
        }

        storeUrl = (): string => {
            return this.config.storeUrl + this.name.replace(/ /g, "+");
        }
    }
}