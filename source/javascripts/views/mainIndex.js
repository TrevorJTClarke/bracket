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

    events: {},

    initialize: function() {
      var _self = this;
      _self.model = User;

      this.render();
      // TODO: change all this
      // this.listenTo(_self.model, 'change', this.render);
      this.model.on('change', this.render, this);
    },

    render: function() {
      var _self = this;
      // console.log("User.get(res)",_self.model.attributes);

      this.template = _.template(template( _self.model.attributes ));
      this.$el.html(this.template);

      return this;
    }

  });
});
