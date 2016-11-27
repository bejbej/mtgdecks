var appConfig = {
    types: ["creature", "artifact", "enchantment", "planeswalker", "land", "instant", "sorcery"],
    categories: [
        { name: "creatures", types: ["creature"] },
        { name: "permanents", types: ["artifact", "enchantment", "planeswalker", "land"] },
        { name: "spells", types: ["instant", "sorcery"] },
    ],
    statCategories: [
        { name: "cmc", types: ["creature", "artifact", "enchantment", "planeswalker", "instant", "sorcery"] }
    ],
    cardsUrl: "https://api.deckbrew.com/mtg/cards",
    decksUrl: "https://uit.pythonanywhere.com/deck/default/decks",
    imagesUrl: "https://image.deckbrew.com/mtg/multiverseid/",
    storeUrl: "http://shop.tcgplayer.com/productcatalog/product/show?ProductName="
};