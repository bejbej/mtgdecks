module app {
    class DirectiveContainer implements ng.IDirective {
        restrict = "E";
        link = (scope: ng.IScope, elem, attrs) => {
            let currentScope: ng.IScope;

            scope.$watch(attrs.directive, directive => {
                var attributes = Object.keys(attrs).reduce((array, key) => {
                    if (key[0] !== "$" && key !== "directive") {
                        var attribute = key + "=\"" + attrs[key] + "\"";
                        array.push(attribute);
                    }

                    return array;
                }, []).join(" ");
                var template = "<" + directive + " " + attributes + "></" + directive + ">";

                if (currentScope) {
                    currentScope.$destroy();
                }

                currentScope = scope.$new();
                Object.keys(attrs).forEach(key => {
                    if (key[0] !== "$" && key !== "directive") {
                        currentScope[key] = attrs[key];
                    }
                });

                var t = this.$compile(template)(currentScope);
                if (elem[0].firstChild) {
                    elem[0].firstChild.remove();
                }
                elem.append(t);
            });
        }

        constructor(private $compile: ng.ICompileService, private $rootScope: ng.IRootScopeService) { }
    }

    angular.module("app").directive("directiveContainer", ($compile, $rootScope) => new DirectiveContainer($compile, $rootScope));
}