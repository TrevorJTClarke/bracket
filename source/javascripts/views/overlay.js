define([
  'jquery',
  'backbone',
  'hbars!templates/overlay'
],
function(
  $,
  Backbone,
  template
) {

  // PRIVATE METHODS
  var warp = $(".warp"),
      warpActive = "active";

  return Backbone.View.extend({

    el: '.overlay',

    initialize: function() {
      this.render();
      return this;
    },

    render: function() {

      this.template = _.template(template({}));
      this.$el.html(this.template);
      this.$el.hide();

      return this;
    },

    show: function () {
      warp.removeClass(warpActive);

      setTimeout(function(){
        this.$el.show();
      },160);
      
      setTimeout(function(){
        warp.addClass(warpActive);
      },340);
    },

    hide: function () {
      warp.addClass(warpActive);

      setTimeout(function(){
        this.$el.hide();
      },160);

      setTimeout(function(){
        warp.removeClass(warpActive);
      },340);
    }

  });
});
