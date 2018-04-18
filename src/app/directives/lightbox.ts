module app {
    class Lightbox {
        showLightbox = (event, url) => {
            var lightbox = document.createElement("div");
            lightbox.className = "lightbox";

            var img = document.createElement("img");
            img.src = url;

            var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

            if ((height * 3) >> 2 > width) {
                img.style.width = "90%";
            }
            else {
                img.style.height = "90%";
            }

            lightbox.appendChild(img);

            lightbox.addEventListener("click", (event) => {
                lightbox.remove();
            });

            document.body.appendChild(lightbox);
            event.preventDefault();
        }

        restrict = "A";
        link = (scope, elem, attrs) => {
            var url: string;
            elem[0].addEventListener("click", event => {
                if (!url) {
                    url = scope.$eval(attrs.lightbox);
                }
                this.showLightbox(event, url);
            });
        };
    }

    angular.module("app").directive("lightbox", () => new Lightbox());
}