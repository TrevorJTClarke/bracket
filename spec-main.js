var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    allTestFiles.push(file);
  }
});

// Have to setup MOCK localStorage so testing works
function Mock() {
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

window.localStorage = new Mock();
localStorage = new Mock();

window.State = window.State || {
  go: function() {}
};

window.bracket = window.bracket || {};

// Stub the baseline file
(function(bracket) {
  var tmpl = '<div class="header"></div>' +
              '<div class="container warp">' +
                '<div class="main-container"></div>' +
              '</div>' +
              '<div class="overlay"></div>' +
              '<div class="notify"></div>';

  var body = document.getElementsByTagName('body')[0];
  var template = document.createElement('div');
  template.innerHTML = tmpl;
  body.appendChild(template);
})(window.bracket);

require.config({
  baseUrl: '/base/source/javascripts',
  paths: {
    Q: 'lib/q.min',
    jquery: 'lib/jquery.min',
    jasminequery: 'lib/jasmine-jquery',
    jasmineajax: 'lib/jasmine-ajax',
    pep: 'lib/jquery.pep.min',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone',
    'backbone.validation': 'lib/backbone.validation.min',
    Handlebars: 'lib/handlebars',
    Helpers: 'lib/handlebars.helpers',
    templates: 'lib/bracket.templates'
  },
  shim: {
    backbone: ['Handlebars'],
    'backbone.validation': ['backbone'],
    pep: ['jquery'],
    templates: ['Handlebars'],
    Q: {
      exports: 'Q'
    },
    underscore: {
      exports: '_'
    },
    Helpers: ['Handlebars'],
    jasmineajax: {
      exports: 'MockAjax'
    },
    jasminequery: {
      exports: 'jasminequery'
    }
  },
  deps: allTestFiles,
  callback: window.__karma__.start
});
