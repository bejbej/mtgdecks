module app {

    class TextSpinner implements ng.IDirective {
        restrict = "A";
        template = "<span></span>";
        link = (scope: ng.IScope, elem: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
            let index = 0;
            let states = "0123".split("");
            let intervalId = undefined;

            elem[0].className = "icon";
            
            let spin = () => {
                elem[0].textContent = states[index];
                index = index + 1 >= states.length ? 0 : index + 1;
            }

            spin();
            intervalId = window.setInterval(spin, 150);

            scope.$on("$destroy", () => {
                if (intervalId != undefined) {
                    window.clearInterval(intervalId);
                }
            });
        }
    }

    angular.module("app").directive("textSpinner", () => new TextSpinner());
}