module app {
    class Lightbox {
        showLightbox = (event, url) => {
            var lightbox = document.createElement("div");
            lightbox.className = "lightbox";

            var img = document.createElement("img");
            img.src = url;

            lightbox.appendChild(img);

            lightbox.addEventListener("click", (event) => {
                lightbox.remove();
            });

            document.body.appendChild(lightbox);
            event.preventDefault();
        }

        restrict = "A";
        link = (scope, elem, attrs) => {
            var url = scope.$eval(attrs.lightbox);
            elem[0].addEventListener("click", event => {
                this.showLightbox(event, url);
            });
        };
    }

    angular.module("app").directive("lightbox", () => new Lightbox());
}