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

  return Backbone.View.extend({

    el: '.main-container',

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

      return this;
    },

    close: function() {
      console.log("this.remove",this.remove);
  		this.remove();
  	},

    logout: function () {
      Session.logout();
    }

  });
});
