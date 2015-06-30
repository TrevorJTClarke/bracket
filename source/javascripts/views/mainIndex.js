define([
  'jquery',
  'backbone',
  'hbars!templates/main_index',
  'hbars!templates/championship_items',
  'models/user',
  'models/session'
],
function(
  $,
  Backbone,
  profileTpl,
  gamesTpl,
  User,
  Session
) {

  // TODO:
  //  link to game

  // PRIVATE METHODS
  var _rootEl = $(".main-container");

  // sort the championships based on time
  function insertionSort( gameArray, attrToSortBy ){
    var finArray = gameArray;
    for(var k=1; k < finArray.length; k++){
      for(var i=k; i > 0 && new Date(finArray[i][attrToSortBy]) < new Date(finArray[i-1][attrToSortBy]); i--){
        var tmpFile = finArray[i];
        finArray[i] = finArray[i-1];
        finArray[i-1] = tmpFile;
      }
    }
    return finArray.reverse();
  }

  return Backbone.View.extend({

    tagName: 'div',
    className: 'main-index',

    model: User,
    gamesData: [],

    events: {
      'click #newChampionship': 'newGame'
    },

    initialize: function() {
      var _self = this;

      _self.render();
      _self.listenTo(_self.model, 'change', this.render);

      _self.constructView();
    },

    render: function() {
      var _self = this;
      var tmplData = _self.model.attributes;

      if(_self.gamesData){
        tmplData.gamesTpl = gamesTpl({
          games: _self.gamesData
        });
      }

      _self.template = _.template(profileTpl(tmplData));
      _self.$el.html(this.template);
      _rootEl.html(_self.$el);

      return this;
    },

    /**
     * grabs all associated data for view, lazily
     */
    constructView: function () {
      var _self = this;

      _self.model.getPlayer()
        .then(function (res) {
          delete res.ChampionshipsRef;
          delete res.UserRef;
          _self.model.set( res );
          _self.render();

          _self.model.getAllChampionships()
            .then(function (res) {
              // sort before add
              var readyGames = insertionSort( res, "updatedAt" );

              _self.gamesData = readyGames;
              _self.render();
            });
        },function (err) {
          console.log("player ref res",err);
        });

    },

    newGame: function (e) {
      if(e){
        e.preventDefault();
      }
      State.go("create");
    }

  });
});
