var appConfig = {
    types: ["creature", "artifact", "enchantment", "planeswalker", "land", "instant", "sorcery"],
    statCategories: [
        { name: "cmc", types: ["creature", "artifact", "enchantment", "planeswalker", "instant", "sorcery"] }
    ],
    cardCacheLimit: 1000,
    authClients: {
        google: {
            authUrl: "https://mtgdecks-api.herokuapp.com/api/auth/google",
            clientId: "762466157003-hq2jn040hivudvem4n0jjas9edu02ruj.apps.googleusercontent.com",
            redirectUri: window.location.origin + window.location.pathname
        }
    },
    cardsUrl: "https://mtgdecks-api.herokuapp.com/api/cards",
    decksUrl: "https://mtgdecks-api.herokuapp.com/api/decks",
    usersUrl: "https://mtgdecks-api.herokuapp.com/api/users",
    imagesUrl: "https://image.deckbrew.com/mtg/multiverseid/",
    storeUrl: "http://shop.tcgplayer.com/productcatalog/product/show?ProductName=",
    storeMassEntryUrl: "http://shop.tcgplayer.com/massentry"
};