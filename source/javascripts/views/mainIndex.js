define([
  'jquery',
  'backbone',
  'hbars!templates/main_index',
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
  var _rootEl = $(".main-container");

  return Backbone.View.extend({

    tagName: 'div',
    className: 'main-index',

    model: User,

    events: {
      'click button': 'logout'
    },

    initialize: function() {
      var _self = this;

      _self.render();
      _self.listenTo(_self.model, 'change', this.render);
    },

    render: function() {
      var _self = this;

      _self.template = _.template(template( _self.model.attributes ));
      _self.$el.html(this.template);
      _rootEl.html(_self.$el);

      return this;
    },

    logout: function () {
      State.go("login");
      Session.logout();
    }

  });
});
