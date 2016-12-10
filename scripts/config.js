var appConfig = {
    types: ["creature", "artifact", "enchantment", "planeswalker", "land", "instant", "sorcery"],
    statCategories: [
        { name: "cmc", types: ["creature", "artifact", "enchantment", "planeswalker", "instant", "sorcery"] }
    ],
    cardCacheLimit: 1000,
    cardsUrl: "https://api.deckbrew.com/mtg/cards",
    decksUrl: "https://mtgdecks-api.herokuapp.com/api/decks",
    imagesUrl: "https://image.deckbrew.com/mtg/multiverseid/",
    storeUrl: "http://shop.tcgplayer.com/productcatalog/product/show?ProductName="
};