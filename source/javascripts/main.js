require.config({

  'baseUrl': '/',
  'paths': {
    // Core Libraries
    // --------------
    'Q': 'javascripts/lib/q.min',
    'jquery': 'javascripts/lib/jquery',
    'underscore': 'javascripts/lib/underscore',
    'backbone': 'javascripts/lib/backbone',
    'backbone.validation': 'javascripts/lib/backbone.validation.min',

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
    'backbone.validation': ['backbone'],
    'Handlebars': {
      'exports': 'Handlebars'
    },
    'Q': {
      'exports': 'Q'
    }
  },

  'hbars': {
    'extension': '.tpl'
  }

});
require([
  'routers/mainRouter',
  'routers/state',
  'backbone.validation',
  'models/validator'
],
function(Router, State) {
  // watch the routes
  window.State = State;
  State.initialize();
});
