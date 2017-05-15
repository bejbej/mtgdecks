﻿module app {
    interface IRootScopeService extends ng.IRootScopeService {
        pageSize: string;
    }

    class Route {
    
        constructor($routeProvider: ng.route.IRouteProvider) {
            $routeProvider
                .when("/decks/:id", { templateUrl: "deck/deck.html" })
                .when("/decks", <any>{ templateUrl: "decks/decks.html", name: "My Decks", pageSize: "sm" })
                .when("/", { redirectTo: '/decks' })
                .otherwise({ templateUrl: "404/404.html", name: "Page Not Found" });
        }
    }

    angular.module("app").config(Route);

    angular.module("app").run(($rootScope: IRootScopeService) => {
        $rootScope.$on("$routeChangeStart", () => {
            document.title = "Loading";
        });

        $rootScope.$on("$routeChangeSuccess", (event, route) => {
            $rootScope.pageSize = route.pageSize;
            if (route.name) {
                document.title = route.name;
            }
        });
    });
}