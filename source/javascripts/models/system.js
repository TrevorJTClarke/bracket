define([
  'backbone'
],
function(
    Backbone
) {

  var SystemModel = Backbone.Model.extend({

    initialize: function () {
      return this;
    },

    defaults: {
      "Parse": {
        "ROOT": "https://api.parse.com/1",
        "API_KEY": "pPeLQpgxgY9GcPuihyQ1boIH51vod9yK4nMZ1ibA",
        "JS_KEY": "Z4A3F1P8FqI9HHZ87whOhyHny2yKkDo4Xo0GlgzM",
        "REST_KEY": "vRKLltmPuDjdfxFFNs6ZD7iHuG5su0J6nTh0VT36",
        "CLASSES": "/classes",
        "USER": "/_User",
        "CHAMPIONSHIP": "/Championship",
        "CHAMPIONSHIPPLAYERS": "/ChampionshipPlayers"
      }
    }

  });

  return new SystemModel();

});
