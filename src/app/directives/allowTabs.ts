module app {
    class AllowTabs implements ng.IDirective {
        restrict = "A";
        link = (scope: ng.IScope, element: ng.IAugmentedJQuery) => {
            element.bind("keydown", event => {
                debugger;
                if (event.keyCode === 9) {
                    event.preventDefault();

                    var target = <HTMLTextAreaElement>event.target;
                    var start = target.selectionStart;
                    var end = target.selectionEnd;
                    var value = target.value;
                    target.value = value.substring(0, start) + "\t" + value.substring(end);
                    target.selectionStart = start + 1;
                    target.selectionEnd  = target.selectionStart;
                }
            });
        }
    }

    angular.module("app").directive("allowTabs", () => new AllowTabs());
}