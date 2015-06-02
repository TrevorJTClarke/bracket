var gulp        = require('gulp');
var uglify      = require('gulp-uglifyjs');
var concat      = require('gulp-concat');
var template    = require('gulp-template-compile');
var jasmine     = require('gulp-jasmine');
var sass        = require('gulp-sass');
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
        .pipe(gulp.dest('./dist'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});


// // run tests
// gulp.task('test', function () {
//     return gulp.src([
//         './libs/backbone.js',
//         './libs/backbone.localStorage.js',
//         './libs/underscore.js',
//         './js/*.js',
//         './spec/*.js'
//     ])
//     .pipe(jasmine());
// });

/**
 * watchers
 */
var watcherJs = gulp.watch('js/**/*.js', [
    'smash',
    'compress',
    'templatify',
    'copy'
], { cwd: 'dist' }, reload);
var watcherSass = gulp.watch('./public/css/**/*.scss', [
    'sass',
    'sass:watch'
], { cwd: 'dist' }, reload);

// watch files for changes and reload
gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    });
    watcherJs.on('change', function(event) {
        console.log('JS File was ' + event.type + ', running tasks...'); // ' + event.path + '
    });
    watcherSass.on('change', function(event) {
        console.log('Sass File was ' + event.type + ', running tasks...');
    });
    gulp.watch('./public/**/**').on('change', reload);
});


// setup defaults
gulp.task('default', [
    'smash',
    'compress',
    'templatify',
    'copy',
    'sass',
    'sass:watch',
    'serve'
]);
