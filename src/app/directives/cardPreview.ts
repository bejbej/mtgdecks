module app {

    class CardPreview implements ng.IDirective {

        constructor(private config: IConfig) {

        }

        getOffset = (el) => {
            var rect = el.getBoundingClientRect();
            var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
        };

        showCardPreview = (event: Event, url: string): void => {
            var img: any = document.getElementById("card-preview");

            if (!img) {
                img = document.createElement("img");
                img.id = "card-preview";
                document.body.appendChild(img);
            }

            var offset = this.getOffset(event.currentTarget);
            img.style.top = offset.top - 100 + "px";
            img.style.left = offset.left + (<HTMLElement>event.currentTarget).offsetWidth + 20 + "px";
            img.src = url;
        }

        hideCardPreview = (): void => {
            var img: any = document.getElementById("card-preview");
            if (img) {
                img.src = "";
                img.style.top = "-300px";
                img.style.left ="-200px";
            }
        }

        restrict = "A";
        link = (scope: ng.IScope, elem: Element[], attrs) => {
            var url: string;

            var mouseOver = (event) => {
                if (this.config.enableHover) {
                    if (!url) {
                        url = scope.$eval(attrs.lightbox);
                    }
                    this.showCardPreview(event, url);
                }
            }

            var mouseLeave = (event) => {
                if (this.config.enableHover) {
                    this.hideCardPreview();
                }
            }

            elem[0].addEventListener("mouseover", mouseOver);

            elem[0].addEventListener("mouseleave", mouseLeave);

            scope.$on("$destroy", () => {
                this.hideCardPreview();
                elem[0].removeEventListener("mouseover", mouseOver);
                elem[0].removeEventListener("mousleave", mouseLeave);
            });
        };
    }

    angular.module("app").directive("cardPreview", (config: IConfig) => new CardPreview(config));
}