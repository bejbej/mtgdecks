module app {
    angular.module('app').constant('config', appConfig);

    angular.module("app").constant("CardDefinitions", cardsCSV.split("\n").slice(1).reduce((dictionary, cardText) => {
        var parameters = cardText.split("\t");
        var card = {
            name: parameters[0],
            primaryType: parameters[1],
            cmc: Number(parameters[2]),
            color: parameters[3],
            imageUri: parameters[4]
        };
        dictionary[card.name.toLowerCase()] = card;
        return dictionary;
    }, {}));

    angular.module("app").config(($authProvider, config: IConfig) => {
        $authProvider.google({
            clientId: config.authClients.google.clientId,
            url: config.authClients.google.authUrl
        });
    });

    angular.module("app").config((SatellizerConfig, config: IConfig) => {
        SatellizerConfig.tokenPrefix = config.localStorage.prefix;
    });

    angular.module("app").run((config: IConfig, $http: ng.IHttpService, $q: ng.IQService, $auth) => {
        var apiKey = localStorage.getItem("api-key");
        if (apiKey) {
            $http.defaults.headers.common["Api-Key"] = apiKey;
            $auth.isAuthenticated = () => { return true; }
            $auth.logout = () => { return $q.reject() }
            $auth.authenticate = () => { return $q.reject() }
        }
    });

    var lastMouseOverEvent: Date = undefined;

    var enableHover = () => {
        if (lastMouseOverEvent === undefined) {
            lastMouseOverEvent = new Date();
        } else if (new Date().getTime() - lastMouseOverEvent.getTime() < 100) {
            appConfig.enableHover = true;
            document.body.removeEventListener("mouseover", enableHover);
            document.body.addEventListener("touchstart", disableHover);
        } else {
            lastMouseOverEvent = new Date();
        }
    };

    var disableHover = () => {
        appConfig.enableHover = false;
        document.body.removeEventListener("touchstart", disableHover);
        document.body.addEventListener("mouseover", enableHover);
    }

    disableHover();
}
