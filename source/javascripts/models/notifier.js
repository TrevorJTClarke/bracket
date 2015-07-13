define([
  'underscore',
  'backbone',
  'hbars!templates/notifier'
],
function(
  _,
  Backbone,
  notifyTpl
) {

  // Quick model setup
  var NotifierModel = Backbone.Model.extend({
    defaults: {
      title: '',
      duration: 4000
    }
  });

  // PRIVATE METHODS
  var NotifierView = Backbone.View.extend({

    timers: [],
    isActive: false,

    el: '.notify',

    model: new NotifierModel(),

    initialize: function() {
      return this;
    },

    render: function(data) {
      data = data || {};
      this.template = _.template(notifyTpl(data));
      this.$el.html(this.template);
    },

    // THIS IS HACK:Y!
    fire: function(data) {
      if (!data) { return; }

      var _this = this;
      var dur = parseInt(_this.model.get('duration'), 10);

      if (_this.isActive === true) {
        _this.clearAll();
        _this.isActive = false;
      }

      this.render(data);
      _this.$el.addClass(data.type);
      _this.$el.addClass('active');
      _this.isActive = true;

      _this.timers[0] = setTimeout(function() {
        _this.$el.removeClass('active');
      }, dur + 10);

      _this.timers[1] = setTimeout(function() {
        _this.$el.removeClass('error success info warning');
        _this.isActive = false;
      }, dur + 240);
    },

    clearAll: function() {
      var _this = this;
      _.each(_this.timers, function(obj, idx) {
        window.clearTimeout(_this.timers[idx]);
      });
    }
  });

  var Notifier = new NotifierView();

  // SETUP
  Backbone.Notifier = {};
  Backbone.Notifier.__view__ = Notifier;
  _.extend(Backbone.Notifier, Backbone.Events);

  Backbone.Notifier.on('NOTIFY:GLOBAL', function(args) {
    Notifier.fire(args);
  });

});
