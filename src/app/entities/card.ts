module app {
    export class Card {
        name: string;
        quantity: number;
        primaryType: string;
        cmc: number;
        multiverseId: number;

        imageUrl = (): string => {
            return "https://image.deckbrew.com/mtg/multiverseid/" + this.multiverseId + ".jpg";
        }

        storeUrl = (): string => {
            return "http://shop.tcgplayer.com/productcatalog/product/show?ProductName=" + this.name.replace(/ /g, "+");
        }
    }
}