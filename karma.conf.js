// Karma configuration
// Generated on Fri Jun 05 2015 12:32:16 GMT-0700 (PDT)

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'requirejs'],
    files: [
      { pattern: 'source/javascripts/**/*.js', included: false },
      { pattern: 'source/javascripts/templates/*.tpl', included: false },
      { pattern: 'spec/**/*Spec.js', included: false },
      'spec-main.js'
    ],
    exclude: ['source/javascripts/main.js'],
    preprocessors: {},
    // test results reporter to use
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
