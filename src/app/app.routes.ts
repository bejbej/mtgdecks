module app {
    interface IRootScopeService extends ng.IRootScopeService {
        pageSize: string;
    }

    class Route {
    
        constructor($routeProvider: ng.route.IRouteProvider) {
            $routeProvider
                .when("/decks/:id", { template: "<deck></deck>" })
                .when("/decks", { template: "<decks></decks>", name: "My Decks"})
                .when("/", { redirectTo: '/decks' })
                .otherwise({ template: "<not-found></not-found>", name: "Page Not Found" });
        }
    }

    angular.module("app").config(Route);

    angular.module("app").run(($rootScope: IRootScopeService) => {
        $rootScope.$on("$routeChangeSuccess", (event, route) => {
            $rootScope.pageSize = route.pageSize;
            if (route.name) {
                document.title = route.name;
            }
        });
    });
}