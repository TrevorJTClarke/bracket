define([
  'jquery',
  'backbone',
  'hbars!templates/game',
  'models/championship',
  'models/system',
  'collections/players',
  'views/gameEditor',
  'views/gameTiers'
],
function(
  $,
  Backbone,
  gameTpl,
  Championship,
  System,
  Players,
  GameEditor,
  GameTiers
) {

  // PRIVATE METHODS
  var _rootEl = $('.main-container');
  var PL = new Players();
  var editing   = 'editing';
  var active    = 'active';
  var empty     = 'empty';
  var focussed  = 'focussed';
  var container = '.game-container';

  return Backbone.View.extend({

    tagName: 'div',
    className: 'game',
    template: gameTpl,

    model: new Championship(),

    events: {
      'click #doneEditingPlayers': 'finishGame',
      'click #randomize': 'randomizePlayers'
    },

    initialize: function(options) {
      var _this = this;
      var queryParams = System.parseQuery();
      this.model.isEditor = (queryParams.editor === 'true');
      this.render();

      // setup main childview
      this.tiersView = new GameTiers({ el: '.game-container', model: this.model });

      // grab all the data needed for the rest of the child views
      this.getBaseData(options)
        .then(function(resGame, resPlayers) {
          var gameData = resGame[0];
          var playersData = PL.formatPlayers(resPlayers[0].results);

          window.__ap = playersData || [];
          _this.model.gamePlayers = playersData || [];
          _this.model.set(gameData);
          _this.tiersView.render();

          if (_this.model.isEditor) {
            _this.editorView.render();
          }
        },

        function(err) {
          console.log('err', err);
        });

      if (this.model.isEditor) {
        this.editorView = new GameEditor({ el: '.game-editor', model: this.model });
      }
    },

    render: function() {
      var _this = this;

      this.$el.html(this.template);
      this.$root = _rootEl.html(this.$el);
      this.delegateEvents();

      if (this.model.isEditor) {
        this.$el.find('.game-container').addClass('editing');
      }

      return this;
    },

    getBaseData: function(options) {
      var _this = this;
      var playersDfd = PL.getGamePlayers(options.gameId);
      var gameDfd = _this.model.fetch({
        url: _this.model.url + '/' + options.gameId
      });

      return $.when(gameDfd, playersDfd);
    }

  });
});
