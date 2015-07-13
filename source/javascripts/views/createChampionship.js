define([
  'jquery',
  'Q',
  'backbone',
  'models/championship',
  'collections/players',
  'models/system',
  'models/notifier'
],
function(
  $,
  Q,
  Backbone,
  Championship,
  Players,
  System
) {
  // SETUP
  var players = [];
  var PS = System.get('Parse');

  // PRIVATE METHODS
  var _rootEl = $('.main-container');
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
      var _this = this;
      _this.currentStep = 'sectionFirst';
      _this.render();
      _this.championshipTitle = this.$el.find('#chTitle');

      return this;
    },

    // Renders the view's template to the UI
    render: function() {
      var _this = this;

      // Setting the view's template property using the Underscore template method
      this.template = _.template(bracket.createChampionship({
        playerListTpl: bracket.playerList({
          players: players
        })
      }));

      // Dynamically updates the UI with the view's template
      this.$el.html(this.template);
      _rootEl.html(_this.$el);
      this.delegateEvents();

      this.toggleSections();
    },

    toggleSections: function() {
      // resets
      this.$('#sectionFirst').removeClass('show');
      this.$('#sectionSecond').removeClass('show');

      if (this.currentStep) {
        this.$('#' + this.currentStep).addClass('show');
      }
    },

    /**
     * Allows user to create a new championship with a title, then proceeds to next step
     */
    startChampionship: function(e) {
      if (e) {
        e.preventDefault();
      }

      if (!this.championshipTitle.val()) {
        Backbone.Notifier.trigger('NOTIFY:GLOBAL', { type: 'info', title: 'Please enter a championship title!' });
        return;
      }

      // TODO: setup "admin" as an owner of the game, so they can edit etc
      var _this = this;
      var champData = {
        title: _this.championshipTitle.val(),
        active: false,
        status: 'pending'
      };

      // create new championship reference, then store new data
      _this.model.set(champData)
        .save()
        .then(function(res) {
          // update the current championship data model
          _this.model.set(res);

          CP.getAvailablePlayers()
            .then(function(res) {
              players = res;
              _this.render();

              // show the next view
              _this.currentStep = 'sectionSecond';
              _this.toggleSections();

              // bind add/remove events
              _this.bindPlayers();
            },

            function(err) {
              Backbone.Notifier.trigger('NOTIFY:GLOBAL', { type: 'error', title: err });
            });
        },

        function(err) {
          Backbone.Notifier.trigger('NOTIFY:GLOBAL', { type: 'error', title: err });
        });
    },

    /**
     * stores the players and references for the championship, then proceeds to next UI step
     */
    finishCreating: function() {
      var _this = this;
      var playerIds = [];

      // TODO:
      // setup logic for base player requirement totals
      //  EX: if only two players, show single match
      //  if 3 players, require 4

      players.map(function(obj) {
        if (obj.added === true || obj.admin === true) {
          playerIds.push(obj.id);
        }
      });

      var champId = _this.model.get('objectId');
      CP.savePlayers(champId, playerIds)
        .then(function(res) {
          // navigation to tier setup flow
          State.go(champId + '?editor=true');
        },

        function(err) {
          console.log('savePlayers err', err);
        });
    },

    /**
     * toggles if the player is included in the championship game
     * @param  {object} item is the player data
     */
    toggleAddPlayer: function(item) {
      // item.added = !item.added;
      players.map(function(obj, idx) {
        if (obj.id === item.id) {
          players[idx].added = !players[idx].added;
          return;
        }
      });
    },

    /**
     * After all player data is found, bind any methods to the updated templates
     */
    bindPlayers: function() {
      var _this = this;
      players.map(function(obj, idx) {
        var playerData = obj;

        // bind each button
        _this.$el.find('#player_' + obj.id).on('click', function(args) {
          $(this).toggleClass('active');
          _this.toggleAddPlayer(playerData);
        });
      });
    }

  });

});
