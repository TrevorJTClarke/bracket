// Karma configuration
// Generated on Fri Jun 05 2015 12:32:16 GMT-0700 (PDT)

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'requirejs'],
    files: [
      { pattern: 'source/javascripts/lib/backbone.js', included: false },
      { pattern: 'source/javascripts/lib/jquery.js', included: false },
      { pattern: 'source/javascripts/lib/q.min.js', included: false },
      { pattern: 'source/javascripts/lib/jasmine-ajax.js', included: false },
      { pattern: 'source/javascripts/lib/jasmine-jquery.js', included: false },
      { pattern: 'source/javascripts/lib/underscore.js', included: false },
      { pattern: 'source/javascripts/lib/handlebars.js', included: false },
      { pattern: 'source/javascripts/lib/hbars.js', included: false },
      { pattern: 'source/javascripts/lib/text.js', included: false },
      { pattern: 'source/javascripts/collections/**/*.js', included: false },
      { pattern: 'source/javascripts/routers/**/*.js', included: false },
      { pattern: 'source/javascripts/models/**/*.js', included: false },
      { pattern: 'source/javascripts/views/**/*.js', included: false },
      { pattern: 'source/javascripts/templates/**/*.tpl', included: false },
      { pattern: 'spec/**/*Spec.js', included: false },
      'spec-main.js'
    ],
    exclude: [
      'source/javascripts/main.js'
    ],
    preprocessors: {},
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false
  });
};
