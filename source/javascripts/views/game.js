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

  var tiers = {
    tier_1: [{
      players: ["jfkdlsajf-789dfs-fd9s-f89sd09", "jfkdlsajf-789dfs-fd9s-f89sd09"],
      winner: "jfkdlsajf-789dfs-fd9s-f89sd09",
      status: "finished"
    },{
      players: ["jfkdlsajf-789dfs-fd9s-f89sd09", "jfkdlsajf-789dfs-fd9s-f89sd09"],
      winner: null,
      status: "pending"
    }]
  };

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

      _self.model.set(options);
      _self.render();
      _self.listenTo(_self.model, 'change', this.render);
      _self.getBaseData( options );

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

      // piece together the tiers
      tmplData.tiers = [];
      for(var k in tiers){
        var tmpTier = [];
        var tmpSpacers = [];

        for (var i = 0; i < tiers[k].length; i++) {
          var tmpMatch = {
            num: i + 1,
            winner: null,
            status: "pending",
            players: [{},{}]
          };

          tmpTier.push({ matchesTpl: matchesTpl( tmpMatch ) });
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

        // TODO:
        // this.el.attr("draggable", "true");
        // this.el.bind("dragstart", _.bind(this._dragStartEvent, this));
    },

    randomizePlayers: function (e) {
      console.log("hey");
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
