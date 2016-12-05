module app {
    angular.module('app').constant('config', appConfig);

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
