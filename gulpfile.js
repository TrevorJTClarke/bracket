var gulp        = require('gulp');
var uglify      = require('gulp-uglifyjs');
var concat      = require('gulp-concat');
var template    = require('gulp-template-compile');
var jasmine     = require('gulp-jasmine-phantom');
var sass        = require('gulp-sass');
var rjs         = require('gulp-requirejs');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

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

// watch files for changes and reload
gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: 'source',
            middleware: function(req, res, next) {
                var fileName = url.parse(req.url);
                fileName = fileName.href.split(fileName.search).join("");
                var fileExists = fs.existsSync(folder + fileName);
                if (!fileExists && fileName.indexOf("browser-sync-client") < 0) {
                    req.url = "/" + defaultFile;
                }
                return next();
            }
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
// gulp.task('default', [
//     'smash',
//     'compress',
//     'templatify',
//     'copy',
//     'sass',
//     'sass:watch',
//     'serve'
// ]);
