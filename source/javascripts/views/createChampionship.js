define([
  'jquery',
  'Q',
  'backbone',
  'models/championship',
  'models/championshipPlayers',
  'hbars!templates/create_championship',
  'hbars!templates/player_listing_item',
  'models/system',
  'models/notifier'
],
function(
  $,
  Q,
  Backbone,
  Championship,
  ChampionshipPlayers,
  createChampionshipTpl,
  playerListTpl,
  System
){
  // SETUP
  var players = [];
  var PS = System.get("Parse");

  // PRIVATE METHODS
  var _rootEl = $(".main-container");

  // Grab root list of players and only return needed data
  function getAvailablePlayers() {
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
        players = formatList( res.results );

        dfd.resolve(players);
      })
      .error( dfd.reject );

    return dfd.promise;
  }

  return Backbone.View.extend({

    tagName: 'div',
    className: 'create-championship',

    model: new Championship,

    events: {
      'click #newChampionship': 'startChampionship',
      'click #doneAddingPlayers': 'finishCreating'
    },

    initialize: function() {
      var _self = this;
      _self.currentStep = "sectionFirst";
      _self.render();
      _self.championshipTitle = this.$el.find("#chTitle");

      return this;
    },

    // Renders the view's template to the UI
    render: function() {
      var _self = this;
      // Setting the view's template property using the Underscore template method
      this.template = _.template(createChampionshipTpl({
        playerListTpl: playerListTpl({
          players: players
        })
      }));

      // Dynamically updates the UI with the view's template
      this.$el.html(this.template);
      _rootEl.html(_self.$el);

      this.toggleSections();
    },

    toggleSections: function () {
      // resets
      this.$("#sectionFirst").removeClass("show");
      this.$("#sectionSecond").removeClass("show");

      if(this.currentStep){
        this.$("#" + this.currentStep).addClass("show");
      }
    },

    startChampionship: function (e) {
      if(e) {
        e.preventDefault();
      }
      if (!this.championshipTitle.val()){
        Backbone.Notifier.trigger("NOTIFY:GLOBAL", { type: "info", title: "Please enter a championship title!" });
        return;
      }
      var _self = this;
      var champData = {
        title: _self.championshipTitle.val()
      };

      // create new championship reference, then store new data
      _self.model.set( champData )
        .save()
        .then(function(res) {
          // update the current championship data model
          _self.model.set( res );

          getAvailablePlayers()
            .then(function (res) {
              _self.render();
              // show the next view
              _self.currentStep = "sectionSecond";
              _self.toggleSections();

              // bind add/remove events
              _self.bindPlayers();

              _self.$el.find("#doneAddingPlayers").on("click", function() {
                _self.finishCreating();
              });
            },function (err) {
              Backbone.Notifier.trigger("NOTIFY:GLOBAL", { type: "error", title: err });
            });
        }, function (err) {
          Backbone.Notifier.trigger("NOTIFY:GLOBAL", { type: "error", title: err });
        });
    },

    finishCreating: function () {
      console.log("finishCreating players",players);
      var _self = this;
      var gamePlayers = new ChampionshipPlayers();
      var playerIds = [];

      players.map(function (obj) {
        playerIds.push(obj.id);
      });

      gamePlayers.savePlayers( playerIds )
        .then(function (res) {
          console.log("gamePlayers.savePlayers res",res);
          // save the player ref!
          // TODO: do i need to store as a reference?
          _self.model.set({ 'players_ref': ref.objectId })
            .save();
            // TODO: navigation to tier setup flow
        }, function (err) {
          console.log("savePlayers err",err);
        });
    },

    toggleAddPlayer: function ( item ) {
      item.added = !item.added;
      players.map(function (obj,idx) {
        if(obj.id === item.id){
          obj.added = !obj.added;
          return;
        }
      });
    },

    bindPlayers: function () {
      var _self = this;
      players.map(function (obj,idx) {
        var playerData = obj;
        // bind each button
        _self.$el.find("#player_" + obj.id).on("click", function(args){
          $(this).toggleClass("active");
          _self.toggleAddPlayer( playerData );
        });
      });
    }

  });

});


// PARSE REFERENCE CODE TESTS
// var _self = this;
// var userData = Parse.Object.extend("User");
// var query = new Parse.Query(userData);
// query.limit(10)
//     .find()
//     .then(function (res) {
//       // console.log("res",res);
//       var Players = Parse.Object.extend("ChampionshipPlayers");
//       var plrs = new Players();
//
//       res.forEach(function (obj,idx) {
//         var tempUser = obj.attributes;
//             tempUser.id = obj.id;
//
//         players.push(tempUser);
//
//         plrs.addUnique("players", obj.id);
//
//       })
//
//       _self.render();
//       plrs.save()
//           .then(function(res) {
//             console.log("plrs res",res);
//
//             _self.model.set({ "players_ref": res.id }).save();
//           }, function (err) {
//             console.log("err",err);
//           });
//
//     });
