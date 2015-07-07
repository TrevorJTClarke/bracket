define([
  'jquery',
  'backbone',
  'hbars!templates/game',
  'hbars!templates/game_editor',
  'hbars!templates/game_editor_player',
  'hbars!templates/tiers_container',
  'hbars!templates/matches',
  'hbars!templates/matches_spacers',
  'models/championship',
  'collections/players'
],
function(
  $,
  Backbone,
  gameTpl,
  gameEditorTpl,
  gameEditorPlayerTpl,
  tiersContainerTpl,
  matchesTpl,
  matchesSpacersTpl,
  Championship,
  Players
) {

  function parseQuery() {
    var search = window.location.search.substring(1);
    return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
  }

  // TODO:
  // if is edit mode
  //    show the editor
  //    get all players
  //    bind players to drag
  //    setup randomizer fn
  //    setup finish form submittable
  // if no edit mode, just layout each of the games with links to their games

  // PRIVATE METHODS
  var _rootEl = $(".main-container");
  var PL = new Players();
  var editing   = "editing",
      active    = "active",
      empty     = "empty",
      focussed  = "focussed",
      container = ".game-container";

  return Backbone.View.extend({
    templateCache: {},
    modelCache: {},
    isEditor: false,

    tagName: 'div',
    className: 'game',

    model: new Championship(),

    events: {
      // 'click #doneEditingPlayers': 'finishGame' // bind event for when done adding players to game layout,
      'click #randomize': 'randomizePlayers'
    },

    initialize: function(options) {
      var _self = this;
      var queryParams = parseQuery();
      // TODO:
      // get total players
      // generate tier matches
      _self.getBaseData( options );

      // _self.model.set(options);
      // _self.render();
      _self.listenTo(_self.model, 'change', this.render);

      if(queryParams.editor === "true"){
        _self.isEditor = true;
        _self.setupEditor();
      }
    },

    render: function() {
      var _self = this;
      if(!_self.modelCache || _self.modelCache.championship === undefined){return;}

      _self.buildChildViews();
      _self.$el.find(container).addClass(editing);
      _rootEl.html(_self.$el);
      _self.delegateEvents();
      _self.bindDragElems();

      // console.log("RENDERING",_self.modelCache);

      return this;
    },

    // logic for using cached templates over new ones
    buildChildViews: function () {
      var _self = this,
          template;
      var tiers = _self.model.get('tier_1');
      var tmplData = _self.model.attributes;
      _self.$el.empty();

      // TODO: abstract this!
      if(_self.isEditor){
        tmplData.gameEditor = gameEditorTpl({
          gameEditorPlayers: gameEditorPlayerTpl({
            editPlayers: _self.modelCache.allPlayers || []
          })
        });
      }

      // tiers > tiersContainer > tier > matchesTpl > num

      // If no base tier, generate the first set based on players available
      if(_self.modelCache.allPlayers && !tiers){
        var fakeTotalPlayers = 4;
            fakeTotalPlayers = _self.modelCache.allPlayers.length;
        _self.model.generateTier( fakeTotalPlayers );
        tiers = _self.model.get('tier_1');
      }

      // piece together the tiers
      tmplData.tiers = [];
      // for(var k in tiers){
        var tmpTier = [];
        var tmpSpacers = [];

      // Add match templates
      if(tiers){
        for (var i = 0; i < tiers.length; i++) {
          tmpTier.push({ matchesTpl: matchesTpl( tiers[i] ) });
        }
        tmpSpacers.length = Math.round(tmpTier.length / 2);
        // console.log("tmpTier",tmpTier);
        tmplData.tiers.push({ spacers: matchesSpacersTpl(tmpSpacers), tiersContainer: tiersContainerTpl( tmpTier ) });
      }

      var gameElement = gameTpl(tmplData);

      _self.template = _.template( gameElement );
      _self.$el.html(this.template);
    },

    getBaseData: function ( options ) {
      var _self = this;
      // grab the full data from DB
      _self.model.fetch({
          url: _self.model.url + "/" + options.gameId
        })
        .then(function (res) {
          _self.modelCache.championship = res;
          _self.model.set(res);
          _self.render();
        },function (err) {
          console.log("err",err);
        });
    },

    setupEditor: function () {
      var _self = this;

      // grab the full data from DB
      PL.getAvailablePlayers()
        .then(function (res) {
          // console.log("players res",res);
          _self.modelCache.allPlayers = res;
          _self.render();
        },function (err) {
          console.log("err",err);
        });
    },

    /**
     * creates randomized array of players
     * sets up a new tier structure based on the new array setup
     */
    randomizePlayers: function (e) {
      var _self = this;
      var players = _self.modelCache.allPlayers.slice(0);

      // create random array of players
      // an awesome example: http://bost.ocks.org/mike/shuffle/
      function randomizeArray ( array ) {
        var copy = [], n = array.length, i;
        while (n) {
          i = Math.floor(Math.random() * n--);
          copy.push(array.splice(i, 1)[0]);
        }
        return copy;
      }

      // insert the array into tier matches
      _self.model.associatePlayers( randomizeArray( players ) );

      // TODO: re-render with new tier setup
    },



    /**
     * Drag && Drop Handlers
     */
    bindDragElems: function () {
      var _self = this;
      var players = $(".game-player");
      if(!_self.modelCache.allPlayers || players.length <= 1){ return; }
      players.splice(0,1);
      // drag handler fun
      var offset = null;
      var start = function(e) {
        var orig = e.originalEvent;
        var pos = $(this).position();
        offset = {
          x: orig.changedTouches[0].pageX - pos.left,
          y: orig.changedTouches[0].pageY - pos.top
        };

        $(this).addClass("dragging");
      };
      var move = function(e) {
        e.preventDefault();
        var orig = e.originalEvent;
        $(this).css({
          position: "absolute",
          top: orig.changedTouches[0].pageY - offset.y - 20,
          left: orig.changedTouches[0].pageX - offset.x
        });
      };
      var remove = function (e) {
        $(this).removeClass("dragging");
      };
      $.fn.draggable = function() {
        this.bind("touchstart", start);
        this.bind("touchmove", move);
        this.bind("touchend", remove);
      };

      _.forEach(players,function (player) {
        $(player).draggable();
      });

    }

  });
});
