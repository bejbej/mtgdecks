module app {
    class Route {
    
        constructor($routeProvider: ng.route.IRouteProvider) {
            $routeProvider
                .when("/decks/:id", { templateUrl: "deck/deck.html" })
                .when("/decks", { templateUrl: "decks/decks.html" })
                .otherwise({ templateUrl: "404/404.html" });
        }
    }

    angular.module("app").config(Route);
}