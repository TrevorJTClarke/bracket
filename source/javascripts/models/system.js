define([
  'backbone'
],
function(
    Backbone
) {

  return Backbone.Model.extend({

    defaults: {
      "Parse": {
        "ROOT": "https://api.parse.com/1",
        "ROOTCLASS": "https://api.parse.com/1/classes",
        "API_KEY": "pPeLQpgxgY9GcPuihyQ1boIH51vod9yK4nMZ1ibA",
        "JS_KEY": "Z4A3F1P8FqI9HHZ87whOhyHny2yKkDo4Xo0GlgzM",
        "REST_KEY": "vRKLltmPuDjdfxFFNs6ZD7iHuG5su0J6nTh0VT36",
        "USER": "/users",
        "CHAMPIONSHIPS": "/championships",
        "CHAMPIONSHIPPLAYERS": "/championshipplayers"
      }
    }

  });

});
