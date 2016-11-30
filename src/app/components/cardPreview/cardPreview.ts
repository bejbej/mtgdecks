module app {

    class CardPreview implements ng.IDirective {

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

        hideCardPreview = (event): void => {
            var img: any = document.getElementById("card-preview");
            img.src = "";
            img.style.top = "-300px";
            img.style.left ="-200px";
        }

        restrict = "A";
        scope = {
            cardPreview: "="
        };
        link = (scope, elem, attr) => {
            elem[0].addEventListener("mouseover", event => {
                this.showCardPreview(event, scope.cardPreview);
            });

            elem[0].addEventListener("mouseleave", this.hideCardPreview);
        };
    }

    angular.module("app").directive("cardPreview", () => new CardPreview());
}