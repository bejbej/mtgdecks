module app {
    class AllowTabs implements ng.IDirective {
        restrict = "A";
        link = (scope: ng.IScope, element: ng.IAugmentedJQuery) => {
            element.bind("keydown", event => {
                if (event.keyCode === 9) {
                    event.preventDefault();

                    let target = <HTMLTextAreaElement>event.target;
                    let start = target.selectionStart;
                    let end = target.selectionEnd;
                    let value = target.value;
                    target.value = value.substring(0, start) + "\t" + value.substring(end);
                    target.selectionStart = start + 1;
                    target.selectionEnd  = target.selectionStart;
                }
            });
        }
    }

    angular.module("app").directive("allowTabs", () => new AllowTabs());
}