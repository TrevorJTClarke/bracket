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
      this.listenTo(this.model, 'change', this.render);
    },

    events: {},

    render: function() {
      console.log("User.get(res)",User.get("initials"));

      this.template = _.template(template({ user: this.model }));
      this.$el.html(this.template);

      return this;
    }

  });
});
