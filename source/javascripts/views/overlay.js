define([
  'jquery',
  'backbone',
  'Q',
  'hbars!templates/overlay'
],
function(
  $,
  Backbone,
  Q,
  template
) {

  // PRIVATE METHODS
  var elemActive = 'active';
  var elemVisible = 'visible';
  var offsetDefault = 520;

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

    /**
     * reveal the overlay in the UI, hides any gross page UI changes
     * @param  {Number} offset a timeout for transition
     * @return {Promise}        Allows for other methods to wait rather than callbacks
     */
    show: function(offset) {
      var dfd = Q.defer();

      offset = offset || offsetDefault;
      this.$el.addClass(elemVisible);
      this.$el.addClass(elemActive);

      // use offset to all promise to return at given time offset
      setTimeout(function() {
        dfd.resolve();
      }, offset);

      return dfd.promise;
    },

    /**
     * remove the overlay in the UI
     * @param  {Number} offset a timeout for transition
     * @return {Promise}        Allows for other methods to wait rather than callbacks
     */
    hide: function(offset) {
      var dfd = Q.defer();
      var _this = this;

      offset = offset || offsetDefault;
      this.$el.removeClass(elemActive);

      // use offset to all promise to return at given time offset
      setTimeout(function() {
        _this.$el.removeClass(elemVisible);
        dfd.resolve();
      }, offset);

      return dfd.promise;
    }

  });

  return new Overlay();
});
