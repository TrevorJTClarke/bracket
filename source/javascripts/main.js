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
    'Parse': 'javascripts/lib/parse-1.4.2.min',
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
    },
    'Parse': {
      'exports': 'Parse'
    }
  },

  'hbars': {
    'extension': '.tpl'
  }

});
require([
  'routers/mainRouter',
  'models/Session'
],
function(MainRouter, Session) {
  // initialize sessions
  new Session();
  // watch the initial route
  new MainRouter();
});
