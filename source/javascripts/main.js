require.config({

  'baseUrl': '/',
  'paths': {
    // Core Libraries
    // --------------
    'jquery': 'javascripts/lib/jquery',
    'underscore': 'javascripts/lib/underscore',
    'backbone': 'javascripts/lib/backbone',

    // Plugins
    // -------
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
    'Handlebars': {
      'exports': 'Handlebars'
    }
  },

  'hbars': {
    'extension': '.tpl'
  }

});
require([
  'jquery',
  'backbone',
  'routers/mainRouter',
  'models/system'
],
function($, Backbone, MainRouter, System) {
    var sys = new System();
    var sysParse = sys.get("Parse");

    // start up the parse system
    Parse.initialize( sysParse.API_KEY, sysParse.JS_KEY );

    // watch the initial route
    new MainRouter();
});
