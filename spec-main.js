var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    allTestFiles.push(file);
  }
});

require.config({
  baseUrl: '/base/source/javascripts',
  paths: {
    'jasminequery': 'lib/jasmine-jquery',
    'jquery': 'lib/jquery',
    'underscore': 'lib/underscore',
    'backbone': 'lib/backbone',
    'firebase': 'lib/firebase',
    'backbonefire': 'lib/backbonefire',
    'text': 'lib/text',
    'Handlebars': 'lib/handlebars',
    'hbars': 'lib/hbars',
  },
  shim: {
    'backbonefire': ['backbone'],
    'underscore': {
      exports: '_'
    },
    'Handlebars': {
      'exports': 'Handlebars'
    }
  },
  hbars: {
    extension: '.tpl',
    compileOptions: {}
  },
  deps: allTestFiles,
  callback: window.__karma__.start
});
