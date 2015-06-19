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
      warpActive = "active",
      elemActive = "active",
      elemVisible = "visible";

  var Overlay = Backbone.View.extend({

    el: '.overlay',

    initialize: function() {
      this.render();
      return this;
    },

    render: function() {

      this.template = _.template(template({}));
      this.$el.html(this.template);

      return this;
    },

    show: function () {
      var _self = this;
      warp.removeClass(warpActive);
      _self.$el.addClass(elemActive);

      setTimeout(function(){
        _self.$el.addClass(elemVisible);
      },140);

      setTimeout(function(){
        warp.addClass(warpActive);
      },220);
    },

    hide: function () {
      var _self = this;
      warp.addClass(warpActive);
      _self.$el.removeClass(elemVisible);

      setTimeout(function(){
        warp.removeClass(warpActive);
      },120);

      setTimeout(function(){
        _self.$el.removeClass(elemActive);
      },180);
    }

  });

  return new Overlay();
});
