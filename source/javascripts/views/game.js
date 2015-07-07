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
  // finish form submittable
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
      'click #doneEditingPlayers': 'finishGame',
      'click #randomize': 'randomizePlayers'
    },

    initialize: function(options) {
      var _self = this;
      var queryParams = parseQuery();
      // TODO:
      // get total players
      // generate tier matches

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

      _self.$el.empty();
      _self.buildChildViews();
      if(_self.isEditor){
        _self.$el.find(container).addClass(editing);
      }
      _rootEl.html(_self.$el);
      _self.delegateEvents();
      _self.bindDragElems();
      // _self.bindDropElems();

      // console.log("RENDERING",_self.modelCache);

      return this;
    },

    // logic for using cached templates over new ones
    buildChildViews: function () {
      var _self = this,
          template;
      var tierCount = parseInt(_self.model.get('tierCount'), 10);
      var tmplData = _self.model.attributes;
      var tiersData = [];

      // TODO: abstract this!
      if(_self.isEditor){
        tmplData.gameEditor = gameEditorTpl({
          gameEditorPlayers: gameEditorPlayerTpl({
            editPlayers: _self.modelCache.allPlayers || []
          })
        });
      }

      // If no base tier, generate the first set based on players available
      if(_self.modelCache.allPlayers && tierCount === 0){
        var fakeTotalPlayers = 4;
            fakeTotalPlayers = _self.modelCache.allPlayers.length;
        _self.model.generateTier( fakeTotalPlayers );
        tierCount = 1;
      }

      // find all tier data, and prep for templates
      if(tierCount > 0){
        for (var i = 1; i <= tierCount; i++) {
          var nm = _self.model.tierNamespace + i;
          var tmpTierData = _self.model.get( nm );

          tiersData[nm] = tmpTierData || [];
        }
      }

      tmplData.tiers = [];
      for(var k in tiersData){
        var tmpTier = [];
        var tmpSpacers = [];

        // Add match templates
        for (var i = 0; i < tiersData[k].length; i++) {
          tmpTier.push({ matchesTpl: matchesTpl( tiersData[k][i] ) });
        }
        tmpSpacers.length = Math.round(tmpTier.length / 2);
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
     *
     */
    finishGame: function () {
      console.log("finishGame");
      this.cleanEditor();
    },

    /**
     * creates randomized array of players
     * sets up a new tier structure based on the new array setup
     */
    randomizePlayers: function (e) {
      var _self = this;
      var players = _self.modelCache.allPlayers.slice(0);

      // remove old data
      _self.model.clearTiers();

      // create random array of players
      // an awesome example: http://bost.ocks.org/mike/shuffle/
      function randomizeArray ( array ) {
        var copy = [],
            n = array.length,
            i;
        while (n) {
          i = Math.floor(Math.random() * n--);
          copy.push(array.splice(i, 1)[0]);
        }
        return copy;
      }

      // insert the array into tier matches
      _self.model.associatePlayers( randomizeArray( players ) );

      // re-render with new tier setup
      _self.render();
      _self.cleanEditorPlayers();
    },

    /**
     * removes all editor elements
     */
    cleanEditor: function () {
      var finishBtn = $("#doneEditingPlayers"),
          editor = $(".game-editor");

      this.cleanEditorPlayers();

      // remove the editor itself
      finishBtn.remove();
      editor.remove();

      // remove editing state
      this.$el.find(container).removeClass(editing);
    },

    /**
     * removes all editor players
     */
    cleanEditorPlayers: function () {
      var players = $(".game-player");
          players.splice(0,1);

      // remove all player elements and their events
      _.forEach(players,function (player) {
        $(player).remove();
      });
    },


    /**
     * Drag && Drop Handlers
     */
    bindDragElems: function () {
      var _self = this;
      var players = $(".game-player");
      if(!_self.modelCache.allPlayers || players.length <= 1){ return; }
      // remove the silly random button
      players.splice(0,1);

      function bindPlayer( item ) {
        $(item).pep({
          droppable: '.match',
          droppableActiveClass: 'draghover',
          activeClass: 'dragging',
          shouldEase: false,
          place:false,
          cssEaseDuration: 1,
          cssEaseString: "ease-in-out",
          velocityMultiplier: 1,
          useCSSTranslation: false,
          moveTo: function (x,y) {
            var tiny = this.$el[0],
                offLeft = tiny.offsetLeft,
                offTop = tiny.offsetTop;
            // offLeft = "offLeft " + left + " + " + offLeft;
            // offTop = "offTop " + top + " + " + offTop;

            this.$el.css({
              left: x,
              top: y
            });
            // this.$el.top = top;
            console.log("e,obj",x,y);
            // if(dragObject){
          	// 	dragObject.style.position = 'absolute';
          	// 	dragObject.style.top      = mousePos.y - mouseOffset.y;
          	// 	dragObject.style.left     = mousePos.x - mouseOffset.x;
          	// 	return false;
          	// }
          },
          stop: function(ev, obj){
            if(this.activeDropRegions.length > 0){
              _self.handleDrop(this.activeDropRegions[0]);
            }
          },
          revert: true,
          revertIf: function(ev, obj){
            return !this.activeDropRegions.length;
          }
        });
      }

      _.forEach(players,function (player) {
        bindPlayer( player );
      });

    },

    handleDrop: function (el) {
      console.log("el",el);
      // TODO:
      // remove el from start
      // add data to match
      // re-render
    }

  });
});
// document.onmousemove = mouseMove;
// document.onmouseup   = mouseUp;
// var dragObject  = null;
// var mouseOffset = null;
// function getMouseOffset(target, ev){
// 	ev = ev || window.event;
// 	var docPos    = getPosition(target);
// 	var mousePos  = mouseCoords(ev);
// 	return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
// }
// function getPosition(e){
// 	var left = 0;
// 	var top  = 0;
// 	while (e.offsetParent){
// 		left += e.offsetLeft;
// 		top  += e.offsetTop;
// 		e     = e.offsetParent;
// 	}
// 	left += e.offsetLeft;
// 	top  += e.offsetTop;
// 	return {x:left, y:top};
// }
// function mouseMove(ev){
// 	ev           = ev || window.event;
// 	var mousePos = mouseCoords(ev);
// 	if(dragObject){
// 		dragObject.style.position = 'absolute';
// 		dragObject.style.top      = mousePos.y - mouseOffset.y;
// 		dragObject.style.left     = mousePos.x - mouseOffset.x;
// 		return false;
// 	}
// }
// function mouseUp(){
// 	dragObject = null;
// }
// function makeDraggable(item){
// 	if(!item) return;
// 	item.onmousedown = function(ev){
// 		dragObject  = this;
// 		mouseOffset = getMouseOffset(this, ev);
// 		return false;
// 	}
// }
