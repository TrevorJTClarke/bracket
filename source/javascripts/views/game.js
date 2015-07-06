define([
  'jquery',
  'backbone',
  'hbars!templates/game',
  'models/championship',
  'collections/players'
],
function(
  $,
  Backbone,
  template,
  Championship,
  Players
) {

  // PRIVATE METHODS
  var _rootEl = $(".main-container");
  var PL = new Players();

  return Backbone.View.extend({

    tagName: 'div',
    className: 'game',

    model: new Championship(),

    events: {
      // 'click #newChampionship': 'newGame'
    },

    initialize: function(options) {
      var _self = this;
      _self.model.set(options);

      _self.render();
      _self.listenTo(_self.model, 'change', this.render);

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

      // grab the full data from DB
      PL.getAvailablePlayers()
        .then(function (res) {
          console.log("players res",res);
        },function (err) {
          console.log("err",err);
        });
    },

    render: function() {
      var _self = this;

      _self.template = _.template(template( _self.model.attributes ));
      _self.$el.html(this.template);
      _rootEl.html(_self.$el);
      _self.delegateEvents();

      return this;
    }

  });
});
