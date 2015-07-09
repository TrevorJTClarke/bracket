define([
  'jquery',
  'backbone',
  'hbars!templates/game',
  'models/championship',
  'models/system',
  'collections/players',
  'views/gameEditor'
],
function(
  $,
  Backbone,
  gameTpl,
  Championship,
  System,
  Players,
  GameEditor
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
    isEditor: false,

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

      // TODO: for child views
      // this.listenTo(this.model, 'change:somthing', this.render);
      this.render();
      this.getBaseData(options)
        .then(function(resGame, resPlayers) {
          var gameData = resGame[0];
          var playersData = PL.formatPlayers(resPlayers[0].results);

          window.__ap = playersData || [];
          _this.model.set(gameData);
          _this.gamePlayers = playersData || [];

          // TODO: for child views
          // _this.render();
        },

        function(err) {
          console.log('err', err);
        });

      if (queryParams.editor === 'true') {
        this.isEditor = true;
        this.editorView = new GameEditor({ el: '.game-editor', model: this.model });
      }
    },

    render: function() {
      var _this = this;

      this.$el.html(this.template);
      this.$root = _rootEl.html(this.$el);
      this.delegateEvents();

      if (this.isEditor) {
        this.$el.find(container).addClass(editing);
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
