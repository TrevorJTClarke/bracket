require.config({

  'baseUrl': '/',
  'paths': {
    // Core Libraries
    // --------------
    'jquery': 'javascripts/lib/jquery',
    'underscore': 'javascripts/lib/underscore',
    'backbone': 'javascripts/lib/backbone',
    'firebase': 'javascripts/lib/firebase',
    'backbonefire': 'javascripts/lib/backbonefire',

    // Plugins
    // -------
    'backbone.localStorage': 'javascripts/lib/backbone.localStorage',
    'text': 'javascripts/lib/text',
    'Handlebars': 'javascripts/lib/handlebars',
    'hbars': 'javascripts/lib/hbars',

    // Base Files
    // ----------
    'views': 'javascripts/views',
    'models': 'javascripts/models',
    'routers': 'javascripts/routers',
    'templates': 'javascripts/templates',
    'collections': 'javascripts/collections'
  },

  // Sets the configuration for your third party scripts that are not AMD compatible
  'shim': {
    // Backbone.validateAll plugin that depends on Backbone
    'backbone.localStorage': ['backbone'],
    'Handlebars': {
      'exports': 'Handlebars'
    }
  },

  'hbars': {
    'extension': '.tpl', // default = '.html'
    'compileOptions': {}  // options object which is passed to Handlebars compiler
  }

});
require([
  'jquery',
  'backbone',
  'routers/mainRouter'
],
function($, Backbone, MainRouter) {
    new MainRouter();
});
