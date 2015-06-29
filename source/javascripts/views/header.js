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
      var _self = this;

      this.template = _.template(template( _self.model.attributes ));
      this.$el.html(this.template);

      // toggle the button context
      this.toggleButtonContent(true);

      return this;
    },

    toggleAuthElems: function (model) {
      var isAuthed = model.get("auth");
      var action = (isAuthed === true)? "add":"remove";
      this.$el.find(".profile")[action + "Class"]("show");
      this.$el.find(".nav-action")[action + "Class"]("show");
    },

    toggleButtonContent: function (bool) {
      // var open = "+",
      //     close = "&times;";
      // this.$el.find(".btn-action")[0].innerHTML = (bool === true)? open : close;
    },

    viewProfile: function (e) {
      if(e){
        e.preventDefault();
      }
      State.go("");
      this.toggleButtonContent(true);
    },

    logout: function () {
      State.go("login");
      Session.logout();
    }

  });
});
