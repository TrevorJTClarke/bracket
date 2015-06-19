define([
  'jquery',
  'backbone',
  'models/header',
  'hbars!templates/header'
],
function(
  $,
  Backbone,
  Model,
  template
) {

  return Backbone.View.extend({

    el: '.header',

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
