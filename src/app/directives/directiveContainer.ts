module app {
    class DirectiveContainer implements ng.IDirective {
        restrict = "E";
        link = (scope: ng.IScope, elem, attrs) => {
            scope.$watch(attrs.directive, directive => {
                var attributes = Object.keys(attrs).reduce((array, key) => {
                    if (key[0] !== "$" && key !== "directive") {
                        var attribute = key + "=\"" + attrs[key] + "\"";
                        array.push(attribute);
                    }

                    return array;
                }, []).join(" ");
                var template = "<" + directive + " " + attributes + "></" + directive + ">";
                var t = this.$compile(template)(scope);
                if (elem[0].firstChild) {
                    elem[0].firstChild.remove();
                }
                elem.append(t);
            });
        }

        constructor(private $compile: ng.ICompileService) { }
    }

    angular.module("app").directive("directiveContainer", $compile => new DirectiveContainer($compile));
}