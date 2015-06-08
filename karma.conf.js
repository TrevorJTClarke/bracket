// Karma configuration
// Generated on Fri Jun 05 2015 12:32:16 GMT-0700 (PDT)

module.exports = function(config) {
  config.set({
    basePath: 'public/js',
    frameworks: ['jasmine', 'requirejs'],
    files: [
        {pattern: 'libs/**/*.js', included: false},
        {pattern: 'app/collections/*.js', included: false},
        {pattern: 'app/models/*.js', included: false},
        {pattern: 'app/views/*.js', included: false},
        {pattern: 'app/templates/*.html', included: false},
        {pattern: 'app/routers/*.js', included: false},
        {pattern: 'tests/**/*.js', included: false},
        'test-main.js'
    ],
    exclude: [
        // 'app/templates/*.html'
    ],
    preprocessors: {
    },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
