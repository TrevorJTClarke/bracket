define([
  'jquery',
  'backbone',
  'models/user',
  'models/session',
  'hbars!templates/header'
],
function(
  $,
  Backbone,
  User,
  Session,
  template
) {

  return Backbone.View.extend({

    el: '.header',

    events: {
      'click .profile': 'viewProfile',
      'click button': 'logout'
    },

    model: User,

    initialize: function() {
      this.newGameActive = false;
      this.render();
      this.listenTo(Session, 'change', this.toggleAuthElems);

      return this;
    },

    render: function() {
      var _this = this;

      this.template = _.template(template(_this.model.attributes));
      this.$el.html(this.template);

      return this;
    },

    toggleAuthElems: function(model) {
      var isAuthed = model.get('auth');
      var action = (isAuthed === true) ? 'add' : 'remove';
      this.$el.find('.profile')[action + 'Class']('show');
      this.$el.find('.nav-action')[action + 'Class']('show');
    },

    viewProfile: function(e) {
      if (e) {
        e.preventDefault();
      }

      State.go('');
    },

    logout: function() {
      State.go('login');
      Session.logout();
    }

  });
});
