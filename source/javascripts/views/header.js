define([
  'jquery',
  'backbone',
  'models/user',
  'hbars!templates/header'
],
function(
  $,
  Backbone,
  User,
  template
) {

  return Backbone.View.extend({

    el: '.header',

    events: {},

    model: User,

    initialize: function() {
      this.render();

      return this;
    },

    render: function() {
      var _self = this;

      this.template = _.template(template( _self.model.attributes ));
      this.$el.html(this.template);

      return this;
    }

  });
});
