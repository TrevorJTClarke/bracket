var allTestFiles = [];
var TEST_REGEXP = /\/base\/tests\.js$/;

Object.keys(window.__karma__.files).forEach(function(file) {
  if (file.search("tests") !== -1) {
    allTestFiles.push(file);
  }
});

require.config({
  baseUrl: '/base/app',
  paths: {
    'jquery': '../libs/jquery',
    'underscore': '../libs/underscore',
    'backbone': '../libs/backbone',
    'text': '../libs/text',
    'jasmine-jquery': '../libs/jasmine-jquery'
  },
  shim: {
    'underscore': {
      exports: '_'
    }
  },
  deps: allTestFiles,
  callback: window.__karma__.start
});
