﻿module app {
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
