module app {
    class Route {
    
        constructor($routeProvider: ng.route.IRouteProvider) {
            $routeProvider
                .when("/decks/:id", { templateUrl: "deck/deck.html" })
                .when("/decks", { templateUrl: "decks/decks.html" })
                .when("/", { redirectTo: '/decks/new' })
                .otherwise({ templateUrl: "404/404.html", name: "Page Not Found" });
        }
    }

    angular.module("app").config(Route);

    angular.module("app").run(($rootScope: ng.IRootScopeService) => {
        $rootScope.$on("$routeChangeStart", () => {
            document.title = "Loading";
        });

        $rootScope.$on("$routeChangeSuccess", (event, route) => {
            if (route.name) {
                document.title = route.name;
            }
        });
    });
}