require.config({

  baseUrl: '/',
  paths: {
    // Core Libraries
    // --------------
    Q: 'javascripts/lib/q.min',
    jquery: 'javascripts/lib/jquery.min',
    pep: 'javascripts/lib/jquery.pep.min',
    underscore: 'javascripts/lib/underscore',
    Handlebars: 'javascripts/lib/handlebars',
    backbone: 'javascripts/lib/backbone',
    'backbone.validation': 'javascripts/lib/backbone.validation.min',

    // Plugins
    // -------
    text: 'javascripts/lib/text',
    Helpers: 'javascripts/lib/handlebars.helpers',

    // Base Files
    // ----------
    templates: 'javascripts/lib/bracket.templates',
    views: 'javascripts/views',
    models: 'javascripts/models',
    routers: 'javascripts/routers',
    collections: 'javascripts/collections'
  },

  // Sets the configuration for your third party scripts that are not AMD compatible
  shim: {
    backbone: ['Handlebars'],
    'backbone.validation': ['backbone'],
    pep: ['jquery'],
    Handlebars: {
      exports: 'Handlebars'
    },
    Helpers: ['Handlebars'],
    templates: ['Handlebars'],
    Q: {
      exports: 'Q'
    }
  }

});
require([
  'routers/mainRouter',
  'routers/state',
  'backbone.validation',
  'models/validator',
  'models/notifier',
  'Helpers',
  'templates',
  'pep'
],
function(Router, State) {
  // watch the routes
  window.State = State;
  State.initialize();
});
