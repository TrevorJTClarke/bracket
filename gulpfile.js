var fs          = require('fs');
var url         = require('url');
var path        = require('path');
var gulp        = require('gulp');
var uglify      = require('gulp-uglifyjs');
var concat      = require('gulp-concat');
var template    = require('gulp-template-compile');
var jasmine     = require('gulp-jasmine-phantom');
var handlebars  = require('gulp-handlebars');
var wrap        = require('gulp-wrap');
var declare     = require('gulp-declare');
var sass        = require('gulp-sass');
var rjs         = require('gulp-requirejs');
var modRewrite  = require('connect-modrewrite');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

// concat the JS files
gulp.task('smash', function() {
  return gulp.src([
      './source/javascripts/helpers/*.js'
  ])
  .pipe(concat('handlebars.helpers.js'))
  .pipe(wrap('define([\'Handlebars\'],function(Handlebars){<%= contents %>});'))
  .pipe(gulp.dest('./source/javascripts/lib/'))
  .on('error', console.log);
});

gulp.task('templatify', function() {
  gulp.src('./source/javascripts/templates/*.tpl')
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'bracket',
      noRedeclare: true
    }))
    .pipe(concat('bracket.templates.js'))
    .pipe(wrap('define([\'Handlebars\'],function(Handlebars){<%= contents %>});'))
    .pipe(gulp.dest('./source/javascripts/lib'))
    .on('error', console.log);
});

// copy index over to dist
gulp.task('copy', function() {
  gulp.src('./source/index.html')
    .pipe(gulp.dest('dist'))
    .on('error', console.log);
});

gulp.task('sass', function() {
  gulp.src('./source/stylesheets/**/*.scss')
    .pipe(sass('bracket.css').on('error', sass.logError))
    .pipe(gulp.dest('./source/stylesheets'))
    .on('error', console.log);
});

gulp.task('sass:watch', function() {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

var watcherSass = gulp.watch('./source/stylesheets/**/*.scss', [
  'sass',
  'sass:watch'
], {cwd: 'source'}, reload);

// The default file if the file/path is not found
var defaultFile = 'index.html';
var folder = path.resolve(__dirname);

// watch files for changes and reload
gulp.task('serve', function() {
  browserSync({
    files: ['./stylesheets/**/*.scss', './javascripts/**/*.js', './index.html'],
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
  'smash',
  'serve'
]);

// setup all things for a build
gulp.task('build', [
  'smash',
  'templatify'
], function() {
  console.log('\n--------------------------\n BUILD FINISHED\n--------------------------');
  process.exit();
});
