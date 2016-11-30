/// <binding BeforeBuild='vet, optimize' />
var args = require('yargs').argv,
    config = require('./gulp.config')(),
    del = require('del'),
    gulp = require('gulp'),
    ts = require('gulp-typescript'),
    tsProject = ts.createProject('tsconfig.json'),
    tsProjectTests = ts.createProject('tsconfig.json'),
    $ = require('gulp-load-plugins')({ lazy: true });


gulp.task('default', ['build']);

/// Source style and correctness
gulp.task('ts-lint', ['clean-ts'], function() {
    log('Linting then ts -> js compilation');
    return gulp
        .src(config.tsBase)
        .pipe(ts(tsProject))
        .pipe($.concat('app.js'))
        .pipe(gulp.dest(config.temp));
});

/// static file management
gulp.task('styles', ['clean-styles'], function() {
    log('Compiling SASS --> CSS');

    return gulp
        .src(config.sass)
        .pipe($.plumber())
        .pipe($.sass({ includePaths: config.sassVendorPaths }))
        .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe(gulp.dest(config.temp));
});

gulp.task('fonts', ['clean-fonts'], function() {
    log('Copying fonts...');
    return gulp.src(config.fonts)
    .pipe(gulp.dest(config.build + 'fonts'));
});

gulp.task('images', ['clean-images'], function() {
    log('Copying images...');
    return gulp.src(config.images)
        .pipe(gulp.dest(config.build + 'images'));
});

gulp.task('templates', function() {
    log('Creating template cache...');

    var options = {
        transformUrl: function(url) {
            return url.match(/[^\\]+\\[^\\.]+.html/)[0];
        }
    };

    return gulp.src(config.templates)
        .pipe($.minifyHtml({ empty: true }))
        .pipe($.angularTemplatecache(options))
        .pipe(gulp.dest(config.temp));
})

/// -- cleaners
gulp.task('clean', function(done) {
    clean([].concat(config.build, config.temp), done);
});

gulp.task('clean-fonts', function(done) {
    clean(config.build + 'fonts/**/*.*', done);
});

gulp.task('clean-images', function(done) {
    clean(config.build + 'images/**/*.*', done);
});

gulp.task('clean-styles', function(done) {
    clean(config.temp + '**/*.css', done);
});

gulp.task('clean-ts', function(done) {
    clean(config.temp + '**/*.js', done);
});

gulp.task('wiredep', ['templates', 'ts-lint'], function() {
    log('Wire up bower css js and our app js into the html');
    var options = config.getWiredepDefaultOptions(),
        wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js)))
        .pipe($.inject(gulp.src(config.config), { name: 'config' }))
        .pipe(gulp.dest(config.client));
});

gulp.task('inject', ['wiredep', 'styles'], function() {
    log('Wire up css into the html, after the files are ready');

    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.css)))
        .pipe(gulp.dest(config.client));
});

gulp.task('build', ['inject', 'fonts', 'images'], function() {
    log('BUILDING * * * Optimizing js, css, html, and moving fonts');

    var assets = $.useref.assets({ searchPath: './' }),
        cssFilter = $.filter('**/*.css', { restore: true }),
        jsFilter = $.filter(['**/*.js', '!**/config.js'], { restore: true });

    return gulp
        .src(config.index)
        .pipe($.plumber())
        .pipe(assets)

        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore)

        .pipe(jsFilter)
        .pipe($.ngAnnotate({ add: true }))
        .pipe($.uglify())
        .pipe(jsFilter.restore)

        .pipe(assets.restore())
        .pipe($.useref())
        .pipe(gulp.dest(config.build));
});

function clean(path, done) {
    log('Cleaning: ' + $.util.colors.bgYellow(path));
    del(path, done);
}

function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnPropery(item)) {
                $.util.log($.util.colors.bgGreen(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.bgGreen(msg));
    }
}
