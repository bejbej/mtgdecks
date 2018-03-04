module app {

    class TextSpinner implements ng.IDirective {
        restrict = "A";
        template = "<span></span>";
        link = (scope: ng.IScope, elem: Element[], attrs) => {
            let index = 0;
            let states = "▙▛▜▟".split("");
            let intervalId = undefined;

            let spin = () => {
                console.log(new Date().getSeconds());
                elem[0].textContent = states[index];
                index = index + 1 >= states.length ? 0 : index + 1;
            }

            spin();
            intervalId = window.setInterval(spin, 150);

            scope.$on("$destroy", () => {
                debugger;
                if (intervalId != undefined) {
                    window.clearInterval(intervalId);
                }
            });
        }
    }

    angular.module("app").directive("textSpinner", () => new TextSpinner());
}