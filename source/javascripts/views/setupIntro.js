define(['jquery', 'backbone', 'models/championship', 'collections/users', 'text!templates/setup_intro.html'],
function($, Backbone, ChampionshipModel, UsersCollection, template){

  return Backbone.View.extend({

    // The DOM Element associated with this view
    el: '.setup-intro',

    // View constructor
    initialize: function() {
      this.model = new ChampionshipModel();
      this.model.set('users', UsersCollection);
      // this.listenTo(this.model, "change", this.render);

      // Calls the view's render method
      this.render();
    },

    // View Event Handlers
    events: {
      'click button': 'testform'
    },

    // Renders the view's template to the UI
    render: function() {
      // Setting the view's template property using the Underscore template method
      this.template = _.template(template, {});

      // Dynamically updates the UI with the view's template
      this.$el.html(this.template);

      // Maintains chainability
      return this;
    },

    testform: function (e) {
      if(e) {
        e.preventDefault();
      }

      return false;
    }

  });

});
