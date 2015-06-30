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
              _self.gamesData = res;
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
