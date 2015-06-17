define([
  'jquery',
  'backbone',
  'hbars!templates/main_index',
  'models/User'
],
function(
  $,
  Backbone,
  template,
  User
) {

  return Backbone.View.extend({

    el: '.main-container',

    model: User,

    initialize: function() {
      this.render();
    },

    events: {},

    render: function() {

      this.template = _.template(template({}));
      this.$el.html(this.template);

      return this;
    }

  });
});
