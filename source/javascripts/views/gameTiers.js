define([
  'jquery',
  'backbone',
  'hbars!templates/tiers_container',
  'hbars!templates/matches',
  'hbars!templates/matches_spacers',
  'models/championship',
  'collections/players'
],
function(
  $,
  Backbone,
  tiersContainerTpl,
  matchesTpl,
  matchesSpacersTpl,
  Championship,
  Players
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
    templateCache: {},
    modelCache: {},
    isEditor: false,

    tagName: 'div',
    className: 'game',

    model: new Championship(),

    events: {
    },

    initialize: function(options) {
      var _this = this;
      var queryParams = parseQuery();

      _this.listenTo(_this.model, 'change', this.render);
      _this.getBaseData(options)
        .then(function(resGame, resPlayers) {
          var gameData = resGame[0];
          var playersData = PL.formatPlayers(resPlayers[0].results);

          window.__ap = playersData || [];
          _this.modelCache.championship = gameData;
          _this.model.set(gameData);
          _this.modelCache.gamePlayers = playersData || [];
          _this.render();
        },

        function(err) {
          console.log('err', err);
        });

      if (queryParams.editor === 'true') {
        _this.isEditor = true;
        _this.setupEditor();
      }
    },

    render: function(noBindDrag) {
      var _this = this;
      if (!_this.modelCache || _this.modelCache.championship === undefined) {
        return;
      }

      _this.$el.empty();
      _this.buildChildViews();

      _rootEl.html(_this.$el);
      _this.delegateEvents();

      if (_this.isEditor) {
        _this.$el.find(container).addClass(editing);
      } else {
        _this.bindMatchToScoreboard();
      }

      if (!noBindDrag) {
        _this.bindDragElems();
      }

      // console.log("RENDERING",_this.modelCache);

      return this;
    },

    // TODO:
    // - break these views into actual child views
    // logic for using cached templates over new ones
    buildChildViews: function() {
      var _this = this;
      var template;
      var tierCount = parseInt(_this.model.get('tierCount'), 10);
      var tmplData = _this.model.attributes;
      var tiersData = [];

      // TODO: abstract this!
      if (_this.isEditor) {
        tmplData.gameEditor = gameEditorTpl({
          gameEditorPlayers: gameEditorPlayerTpl({
            editPlayers: _this.modelCache.allPlayers || []
          })
        });
      }

      // If no base tier, generate the first set based on players available
      if (_this.modelCache.allPlayers && tierCount === 0) {
        var fakeTotalPlayers = 4;

        fakeTotalPlayers = _this.modelCache.allPlayers.length;
        _this.model.generateTier(fakeTotalPlayers);
        tierCount = 1;
      }

      // find all tier data, and prep for templates
      if (tierCount > 0) {
        for (var i = 1; i <= tierCount; i++) {
          var nm = _this.model.tierNamespace + i;
          var tmpTierData = _this.model.get(nm);

          tiersData[nm] = tmpTierData || [];
        }
      }

      tmplData.tiers = [];
      for (var k in tiersData) {
        var tmpTier = [];
        var tmpSpacers = [];

        // Add match templates
        for (var i = 0; i < tiersData[k].length; i++) {
          tmpTier.push({ matchesTpl: matchesTpl(tiersData[k][i])});
        }

        tmpSpacers.length = Math.round(tmpTier.length / 2);
        tmplData.tiers.push({ spacers: matchesSpacersTpl(tmpSpacers), tiersContainer: tiersContainerTpl(tmpTier)});
      }

      var gameElement = gameTpl(tmplData);

      _this.template = _.template(gameElement);
      _this.$el.html(this.template);
    }

  });
});
