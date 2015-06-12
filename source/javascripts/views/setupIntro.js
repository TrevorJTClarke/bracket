define([
  'jquery',
  'backbone',
  'models/championship',
  'collections/users',
  'hbars!templates/setup_intro',
  'hbars!templates/player_listing_item'
],
function(
  $,
  Backbone,
  ChampionshipModel,
  UsersCollection,
  setupTpl,
  playerListTpl
){

  // TEST:
  //
  var players = [{
    initials: "TC",
    name: "Trevor Clarke",
    email: "tclarke@billabong.com",
    color: "2FAB70"
  },{
    initials: "MD",
    name: "Michael Deol",
    email: "mdeol@billabong.com",
    color: "333333"
  },{
    initials: "SP",
    name: "Super Person",
    email: "sperson@billabong.com",
    color: "483989"
  },{
    initials: "YK",
    name: "Yik Yak",
    email: "yyak@billabong.com",
    color: "092323"
  }];

  return Backbone.View.extend({

    el: '.setup-intro',

    initialize: function() {
      // this.model = new ChampionshipModel();
      // this.model.set('users', UsersCollection);
      // this.listenTo(this.model, "change", this.render);

      this.render();
    },

    // Event Handlers
    events: {
      'click button': 'testform'
    },

    // Renders the view's template to the UI
    render: function() {
      // Setting the view's template property using the Underscore template method
      this.template = _.template(setupTpl({
        playerListTpl: playerListTpl({
          players: players
        })
      }));

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
