var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    allTestFiles.push(file);
  }
});

// Have to setup MOCK localStorage so testing works
function mock() {
  this.getItem = function(key) {
    return store[key];
  };
  this.setItem = function(key, value) {
    store[key] = value.toString();
  };
  this.clear = function() {
    store = {};
  };
}
window.localStorage = new mock();
localStorage = new mock();

require.config({
  baseUrl: '/base/source/javascripts',
  paths: {
    'Q': 'lib/q.min',
    'jquery': 'lib/jquery',
    'jasminequery': 'lib/jasmine-jquery',
    'jasmineajax': 'lib/jasmine-ajax',
    'underscore': 'lib/underscore',
    'backbone': 'lib/backbone',
    'text': 'lib/text',
    'Handlebars': 'lib/handlebars',
    'hbars': 'lib/hbars',
  },
  shim: {
    'Q': {
      'exports': 'Q'
    },
    'underscore': {
      exports: '_'
    },
    'Handlebars': {
      'exports': 'Handlebars'
    },
    'jasmineajax': {
      'exports': 'MockAjax'
    }
  },
  hbars: {
    extension: '.tpl'
  },
  deps: allTestFiles,
  callback: window.__karma__.start
});
