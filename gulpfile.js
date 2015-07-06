var fs          = require('fs')
  , url         = require('url')
  , path        = require('path')
  , gulp        = require('gulp')
  , uglify      = require('gulp-uglifyjs')
  , concat      = require('gulp-concat')
  , template    = require('gulp-template-compile')
  , jasmine     = require('gulp-jasmine-phantom')
  , sass        = require('gulp-sass')
  , rjs         = require('gulp-requirejs')
  , modRewrite  = require('connect-modrewrite')
  , browserSync = require('browser-sync')
  , reload      = browserSync.reload;

// // concat the JS files
// gulp.task('smash', function() {
//     return gulp.src([
//         './source/javascripts/config/start.js',
//         './source/javascripts/models/**.js',
//         './source/javascripts/collections/**.js',
//         './source/javascripts/views/**.js',
//         './source/javascripts/app/**.js',
//         './source/javascripts/config/end.js'
//     ])
//     .pipe(concat('bracket.js'))
//     .pipe(gulp.dest('./dist/'));
// });
// // compress the js into mangled goodness
// gulp.task('compress', function() {
//     return gulp.src('./dist/bracket.js')
//         .pipe(uglify('bracket.min.js', {
//             mangle: true
//         }))
//         .pipe(gulp.dest('dist'));
// });
// compile all the templates into something worth using
gulp.task('templatify', function () {
    gulp.src('./source/javascripts/templates/*.tpl')
        .pipe(template())
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('dist'));
});
// copy index over to dist
gulp.task('copy', function(){
    gulp.src('./source/index.html')
        .pipe(gulp.dest('dist'));
});


gulp.task('sass', function () {
    gulp.src('./source/stylesheets/**/*.scss')
        .pipe(sass('bracket.css').on('error', sass.logError))
        .pipe(gulp.dest('./source/stylesheets'));
});
gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});
var watcherSass = gulp.watch('./source/stylesheets/**/*.scss', [
    'sass',
    'sass:watch'
], { cwd: 'source' }, reload);


// The default file if the file/path is not found
var defaultFile = "index.html";
var folder = path.resolve(__dirname);
// watch files for changes and reload
gulp.task('serve', function() {
    browserSync({
        files: ["./stylesheets/**/*.scss", "./javascripts/**/*.js", "./index.html"],
        server: {
            baseDir: 'source',
            middleware: [
              modRewrite([
                '!\\.\\w+$ /index.html [L]'
              ])
            ]
        },
        notify: false
    });
    // watcherJs.on('change', function(event) {
    //     console.log('JS File was ' + event.type + ', running tasks...'); // ' + event.path + '
    // });
    watcherSass.on('change', function(event) {
        console.log('Sass File was ' + event.type + ', running tasks...');
    });
    gulp.watch('./source/**/**/**').on('change', reload);
});


// setup defaults
gulp.task('default', [
    'serve'
]);
