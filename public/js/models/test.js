var Player = Backbone.Model.extend({
  // Default attributes for the todo item.
  defaults: function() {
    return {
      title: "New Player"
    };
  },

  // Toggle the `done` state of this todo item.
  toggle: function() {
    this.save({done: !this.get("done")});
  }

});
