define([
  'backbone'
],
function(
    Backbone
) {

  return Backbone.Model.extend({

    initialize: function() {
      return this;
    },

    defaults: {
      "Firebase": {
        "ROOT": "https://flickering-heat-8044.firebaseio.com",
        "users": "/users",
        "championships": "/championships",
        "stats": "/stats",
        "totals": "/totals"
      }
    },

    setStatsTotal: function (type,incr) {
      if(!type){return;}
      var _self = this;
      var _data = _self.get("Firebase");
      // setup url to update, then proceed with method
      var url = new Firebase( _data.ROOT + _data.stats + _data.totals + _data[type] );

      url.transaction(function(num) {
        // update the count by 1
        if(incr === "-"){
          return num - 1;
        } else {
          return num + 1;
        }
      });
    }

  });

});
