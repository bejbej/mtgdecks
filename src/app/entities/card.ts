module app {
    export class Card {
        color: string;
        name: string;
        quantity: number;
        primaryType: string;
        cmc: number;
        multiverseId: number;

        private _imageUrl: string;
        private static _pattern = /{([^}]*)}/;

        constructor(private config: IConfig) { }

        imageUrl = (): string => {
            if (this._imageUrl != undefined) {
                return this._imageUrl;
            }

            var match = Card._pattern.exec(this.config.imagesUrl);
            if (match === null) {
                this._imageUrl = "";
                return this._imageUrl;
            }

            this._imageUrl = this.config.imagesUrl.replace(Card._pattern, this[match[1]]);
            return this._imageUrl;
        }

        storeUrl = (): string => {
            return this.config.storeUrl + this.name.replace(/ /g, "+");
        }
    }
}