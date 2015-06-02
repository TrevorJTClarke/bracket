var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var concat = require('gulp-concat');
var jasmine = require('gulp-jasmine');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

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
var watcher = gulp.watch('js/**/*.js', [
    // 'scripts',
    'compress'
], { cwd: 'public' }, reload);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});

// watch files for changes and reload
gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: 'public'
        }
    });

    // gulp.watch([
    //     '*.html',
    //     'styles/**/*.css',
    //     'scripts/**/*.js'
    // ], { cwd: 'public' }, reload);
});


// setup defaults
// gulp.task('default', ['scripts']);
