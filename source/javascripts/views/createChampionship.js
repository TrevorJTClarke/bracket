define([
  'jquery',
  'Q',
  'backbone',
  'models/championship',
  'collections/players',
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
  Players,
  createChampionshipTpl,
  playerListTpl,
  System
){
  // SETUP
  var players = [];
  var PS = System.get("Parse");

  // PRIVATE METHODS
  var _rootEl = $(".main-container");
  var CP = new Players();

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

    /**
     * Allows user to create a new championship with a title, then proceeds to next step
     */
    startChampionship: function (e) {
      if(e) {
        e.preventDefault();
      }
      if (!this.championshipTitle.val()){
        Backbone.Notifier.trigger("NOTIFY:GLOBAL", { type: "info", title: "Please enter a championship title!" });
        return;
      }
      // TODO: setup "admin" as an owner of the game, so they can edit etc
      var _self = this;
      var champData = {
        title: _self.championshipTitle.val(),
        active: false,
        status: "pending"
      };

      // create new championship reference, then store new data
      _self.model.set( champData )
        .save()
        .then(function(res) {
          // update the current championship data model
          _self.model.set( res );

          CP.getAvailablePlayers()
            .then(function (res) {
              players = res;
              _self.render();
              // show the next view
              _self.currentStep = "sectionSecond";
              _self.toggleSections();

              // bind add/remove events
              _self.bindPlayers();

              // TODO: this should be handled in the events, WHYA?!
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

    /**
     * stores the players and references for the championship, then proceeds to next UI step
     */
    finishCreating: function () {
      var __self = this;
      var playerIds = [];

      // TODO:
      // setup logic for base player requirement totals
      //  EX: if only two players, show single match
      //  if 3 players, require 4

      players.map(function (obj) {
        if(obj.added === true || obj.admin === true){
          playerIds.push(obj.id);
        }
      });

      var champId = __self.model.get("objectId");
      CP.savePlayers( champId, playerIds )
        .then(function (res) {

            console.log("savePlayers finished res",res);
            // TODO: navigation to tier setup flow
        }, function (err) {
          console.log("savePlayers err",err);
        });
    },

    /**
     * toggles if the player is included in the championship game
     * @param  {object} item is the player data
     */
    toggleAddPlayer: function ( item ) {
      // item.added = !item.added;
      players.map(function (obj,idx) {
        if(obj.id === item.id){
          players[idx].added = !players[idx].added;
          return;
        }
      });
    },

    /**
     * After all player data is found, bind any methods to the updated templates
     */
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
