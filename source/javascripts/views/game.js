define([
  'jquery',
  'backbone',
  'hbars!templates/game',
  'hbars!templates/game_editor',
  'hbars!templates/game_editor_player',
  'models/championship',
  'collections/players'
],
function(
  $,
  Backbone,
  gameTpl,
  gameEditorTpl,
  gameEditorPlayerTpl,
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

  return Backbone.View.extend({
    templateCache: {},
    modelCache: {},

    tagName: 'div',
    className: 'game',

    model: new Championship(),

    events: {
      // 'click #newChampionship': 'newGame'
    },

    initialize: function(options) {
      var _self = this;
      var queryParams = parseQuery();

      _self.model.set(options);
      _self.render();
      _self.listenTo(_self.model, 'change', this.render);
      _self.getBaseData( options );
      console.log("search",parseQuery());

      if(queryParams.editor === true){
        _self.setupEditor();
      }
    },

    render: function() {
      var _self = this;
      var tmplData = _self.model.attributes;
      _self.$el.empty();

      // if(_self.modelCache){
        // for(var k in _self.modelCache){
        //   tmplData[k] = _self.modelCache[k];
        // }
        tmplData.gameEditor = gameEditorTpl({
          gameEditorPlayers: gameEditorPlayerTpl({})
        });
      // }

      _self.template = _.template(gameTpl(tmplData));
      _self.$el.html(this.template);
      _rootEl.html(_self.$el);
      _self.delegateEvents();

      return this;
    },

    getBaseData: function ( options ) {
      var _self = this;
      // grab the full data from DB
      _self.model.fetch({
          url: _self.model.url + "/" + options.gameId
        })
        .then(function (res) {
          _self.model.set(res);
          _self.render();
        },function (err) {
          console.log("err",err);
        });
    },

    setupEditor: function () {

      // grab the full data from DB
      PL.getAvailablePlayers()
        .then(function (res) {
          console.log("players res",res);
        },function (err) {
          console.log("err",err);
        });

        // this.el.attr("draggable", "true");
        // this.el.bind("dragstart", _.bind(this._dragStartEvent, this));
    },

  	_dragStartEvent: function (e) {
  		var data;
  		if (e.originalEvent) e = e.originalEvent;
  		e.dataTransfer.effectAllowed = "copy"; // default to copy
  		data = this.dragStart(e.dataTransfer, e);

  		window._backboneDragDropObject = null;
  		if (data !== undefined) {
  			window._backboneDragDropObject = data; // we cant bind an object directly because it has to be a string, json just won't do
  		}
  	},

  	dragStart: function (dataTransfer, e) { // override me, return data to be bound to drag
      console.log("dataTransfer",dataTransfer);
    }

  });
});
