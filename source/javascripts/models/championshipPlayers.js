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

  return Backbone.Model.extend({

    url: PS.CLASSES + PS.CHAMPIONSHIPPLAYERS,

    initialize: function () {
      return this;
    },

    defaults: {
      // 'players': []
    },

    savePlayers: function ( objectId, playersArray ) {
      // var dfd = Q.defer();
      // var _self = this;
      //
      // _self.set({ players: playersArray })
      //   .save()
      //   .then( dfd.resolve, dfd.reject );
      //
      // return dfd.promise;

      var dfd = Q.defer();
      var url = PS.CLASSES + PS.CHAMPIONSHIPPLAYERS + "/" + objectId;
      var data = {
        "players": {
          "__op":"AddRelation",
          "objects":[]
        }
      };

      for (var i = 0; i < playersArray.length; i++) {
        data.players.objects.push({
          __type: 'Pointer',
          className: '_User',
          objectId: playersArray[i]
        });
      }

      $.ajax({
        url: url,
        type: 'PUT',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json',
        success: dfd.resolve,
        error: dfd.reject
      });

      return dfd.promise;
    },

    // Grab root list of players and only return needed data
    getAvailablePlayers: function () {
      var dfd = Q.defer();
      var _self = this;
      var url = PS.CLASSES + PS.USER;

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
