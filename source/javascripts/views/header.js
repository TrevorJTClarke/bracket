define([
  'jquery',
  'backbone',
  'models/user',
  'hbars!templates/header'
],
function(
  $,
  Backbone,
  User,
  template
) {

  return Backbone.View.extend({

    el: '.header',

    events: {
      'click .profile': 'viewProfile',
      'click button': 'newGame'
    },

    model: User,

    initialize: function() {
      this.render();
      this.model.on("change", this.render, this);

      return this;
    },

    render: function() {
      var _self = this;

      this.template = _.template(template( _self.model.attributes ));
      this.$el.html(this.template);

      return this;
    },

    viewProfile: function (e) {
      if(e){
        e.preventDefault();
      }
      State.go("");
    },

    newGame: function (e) {
      if(e){
        e.preventDefault();
      }
      State.go("setup");
    }

  });
});
