define([
  'Q',
  'backbone',
  'models/system'
],
function(
  Q,
  Backbone,
  System
) {
  // SETUP
  var PS = System.get("Parse");

  // TODO: setup GET players for Championships
  // 'where={"ChampionshipsRef":{"__type":"Pointer","className":"Championships","objectId":"3pf74Md0VT"}}'

  return Backbone.Model.extend({

    url: PS.CLASSES + PS.CHAMPIONSHIPPLAYERS,

    initialize: function () {
      return this;
    },

    defaults: {
    },

    savePlayers: function ( champID, playersArray ) {
      var dfd = Q.defer();
      var url = "/batch";
      var champDataRef = System.getParseRef( "Championships", champID );
      var data = {
        "requests": []
      };

      for (var i = 0; i < playersArray.length; i++) {
        data.requests.push({
          method: 'PUT',
          path: "/1" + PS.CLASSES + PS.CHAMPIONSHIPPLAYERS + "/" + playersArray[i],
          body: {
            "ChampionshipsRef": champDataRef
          }
        });
      }

      $.post( url, JSON.stringify(data) )
        .success( dfd.resolve )
        .error( dfd.reject );

      return dfd.promise;
    },

    // Grab root list of players and only return needed data
    getAvailablePlayers: function () {
      var dfd = Q.defer();
      var _self = this;
      var url = PS.CLASSES + PS.CHAMPIONSHIPPLAYERS;

      function formatList (array) {
        var finArray = [];
        var me = localStorage.getItem("br-user");
            me = JSON.parse(me);

        array.map(function (obj,idx) {
          if(obj.username !== "a"){
            // only add needed data
            var addUser = {
              id: obj.objectId,
              firstName: obj.firstName,
              lastName: obj.lastName,
              email: obj.email,
              color: obj.color,
              initials: obj.initials,
              added: false
            };

            if(obj.username === me.username){
              addUser.email = "Championship Creator";
              addUser.admin = true;
            }

            finArray.push( addUser );
          }
        });

        return finArray;
      }

      $.get( url )
        .success(function (res) {
          // quick filtering of player data
          var players = formatList( res.results );

          dfd.resolve(players);
        })
        .error( dfd.reject );

      return dfd.promise;
    }

  });

});
