define([
  'jquery',
  'backbone',
  'hbars!templates/scoreboard',
  'models/user',
  'models/session'
],
function(
  $,
  Backbone,
  template,
  User,
  Session
) {

  // PRIVATE METHODS
  var _rootEl = $('.main-container');

  return Backbone.View.extend({

    tagName: 'div',
    className: 'scoreboard',

    model: User,

    events: {
      'click #newChampionship': 'newGame'
    },

    initialize: function() {
      var _this = this;

      _this.render();
      _this.listenTo(_this.model, 'change', this.render);
    },

    render: function() {
      var _this = this;

      _this.template = _.template(template(_this.model.attributes));
      _this.$el.html(this.template);
      _rootEl.html(_this.$el);

      return this;
    },

    newGame: function(e) {
      if (e) {
        e.preventDefault();
      }

      // State.go("create");
    }

  });
});
