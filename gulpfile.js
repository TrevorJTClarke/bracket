var gulp        = require('gulp');
var uglify      = require('gulp-uglifyjs');
var concat      = require('gulp-concat');
var template    = require('gulp-template-compile');
// var jasmine     = require('gulp-jasmine');
var jasmine     = require('gulp-jasmine-phantom');
var sass        = require('gulp-sass');
var rjs         = require('gulp-requirejs');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

// concat the JS files
gulp.task('smash', function() {
    return gulp.src([
        './public/js/config/start.js',
        './public/js/models/**.js',
        './public/js/collections/**.js',
        './public/js/views/**.js',
        './public/js/app/**.js',
        './public/js/config/end.js'
    ])
    .pipe(concat('bracket.js'))
    .pipe(gulp.dest('./dist/'));
});
// compress the js into mangled goodness
gulp.task('compress', function() {
    return gulp.src('./dist/bracket.js')
        .pipe(uglify('bracket.min.js', {
            mangle: true
        }))
        .pipe(gulp.dest('dist'));
});
// compile all the templates into something worth using
gulp.task('templatify', function () {
    gulp.src('./public/templates/*.html')
        .pipe(template())
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('dist'));
});
// copy index over to dist
gulp.task('copy', function(){
    gulp.src('./public/index.html')
        .pipe(gulp.dest('dist'));
});


gulp.task('sass', function () {
    gulp.src('./public/css/**/*.scss')
        .pipe(sass('bracket.css').on('error', sass.logError))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('rjs', function() {
    rjs({
        baseUrl: './public/js/app/models',
        out: 'bracket.rjs.js',
        paths: {
            "jquery": "../../libs/jquery",
            "underscore": "../../libs/underscore",
            "backbone": "../../libs/backbone",
            "backbone.localStorage": "../../libs/backbone.localStorage",
            "text": "../../libs/text"
        },
        shim: {
            "backbone.localStorage": ["backbone"]
        },
        name: "HeaderModel"
    })
    .pipe(gulp.dest('./public/js/tests/')); // pipe it to the output DIR
});


// // run tests
gulp.task('test', function () {
    return gulp.src([
            // './public/js/app/models/HeaderModel.js',
            './public/js/tests/models/HeaderModel.js'
        ])
        .pipe(jasmine({
            includeStackTrace: true,
            integration: true,
            vendor: [
                // './public/js/tests/bracket.rjs.js',
                // './public/js/tests/config.js',
                './public/js/libs/underscore.js',
                './public/js/libs/jquery.js',
                './public/js/libs/require.min.js',
                './public/js/libs/backbone.js',
                './public/js/libs/backbone.localStorage.js',
                './public/js/libs/text.js',
            ],
            keepRunner: './fdsa'
        }));
});

/**
 * watchers
 */
var watcherJs = gulp.watch('js/**/*.js', [
    'smash',
    'compress',
    'templatify',
    'copy'
], { cwd: 'public' }, reload);
var watcherSass = gulp.watch('./public/css/**/*.scss', [
    'sass',
    'sass:watch'
], { cwd: 'public' }, reload);

// watch files for changes and reload
gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: 'public'
        }
    });
    // watcherJs.on('change', function(event) {
    //     console.log('JS File was ' + event.type + ', running tasks...'); // ' + event.path + '
    // });
    watcherSass.on('change', function(event) {
        console.log('Sass File was ' + event.type + ', running tasks...');
    });
    gulp.watch('./public/**/**').on('change', reload);
});


// setup defaults
// gulp.task('default', [
//     'smash',
//     'compress',
//     'templatify',
//     'copy',
//     'sass',
//     'sass:watch',
//     'serve'
// ]);
