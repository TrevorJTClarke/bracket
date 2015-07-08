define([
  'underscore',
  'backbone',
  'backbone.validation'
],
function(
  _,
  Backbone
) {

  _.extend(Backbone.Validation.callbacks, {
    valid: function(view, attr, selector) {
      var $el = view.$('[name=' + attr + ']');
      var $group = $el.closest('.form-group');

      $group.removeClass('error');
    },

    invalid: function(view, attr, error, selector) {
      var $el = view.$('[name=' + attr + ']');
      var $group = $el.closest('.form-group');

      $group.addClass('error');

      // send error to global error notifier
      Backbone.Notifier.trigger('NOTIFY:GLOBAL', { type: 'error', title: error });
    }
  });
});
