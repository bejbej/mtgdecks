module.exports = new function () {
        this.dist = {
            root: "./dist",
            fonts: "./dist/fonts",
            scripts: "./dist/scripts",
            styles: "./dist/styles",
            indexFile: "./dist/index.html",
            cssFiles: "./dist/styles/*.css",
            jsFiles: [
                "./dist/scripts/lib.js",
                "./dist/scripts/config.js",
                "./dist/scripts/app.js"
            ]
        };
        this.src = {
            config: "./src/app/config.js",
            fonts: [],
            index: "./src/index.html",
            templates: [
                './src/app/**/*.html',
                '!./src/app/index.html'
            ],
            typescript: [
                "./src/app/app.module.ts",
                "./src/app/**/*.ts",
                "./typings/**/*.ts"
            ],
            sass: [
                "./src/styles/styles.scss"
            ]
        }
        this.wiredepOptions = {
            exclude: [/jquery/, /bootstrap-sass/]
        }
} ();
