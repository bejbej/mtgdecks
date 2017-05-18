module app {
    angular.module('app').constant('config', appConfig);

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
            delete(lastMouseOverEvent);
            appConfig.enableHover = true;
            document.body.removeEventListener("mouseover", enableHover);
        } else {
            lastMouseOverEvent = new Date();
        }
    };

    document.body.addEventListener("mouseover", enableHover);
}
