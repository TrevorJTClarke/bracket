define([
  'jquery',
  'backbone',
  'collections/championships',
  'collections/users',
  'models/championship',
  'hbars!templates/setup_intro',
  'hbars!templates/player_listing_item',
  'models/system'
],
function(
  $,
  Backbone,
  Championships,
  Users,
  Championship,
  setupTpl,
  playerListTpl,
  System
){
  // SETUP
  var sys = new System();

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
  players = [];

  return Backbone.View.extend({

    el: '.setup-intro',

    collection: new Championships,

    events: {
      'click button': 'startChampionship'
    },

    initialize: function() {
      this.currentStep = "sectionFirst";
      this.render();

      this.championshipTitle = this.$("#chTitle");

      // this.model = new Championship();
      // this.model.set('users', UsersCollection);
      // this.listenTo(this.model, "change", this.render);
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

      this.toggleSections();

      // Maintains chainability
      return this;
    },

    toggleSections: function () {
      // resets
      this.$("#sectionFirst").removeClass("show");
      this.$("#sectionSecond").removeClass("show");

      if(this.currentStep){
        this.$("#" + this.currentStep).toggleClass("show");
      }
    },

    startChampionship: function (e) {
      if(e) {
        e.preventDefault();
      }
      if (!this.championshipTitle.val()){ return; }

      var champData = {
        title: this.championshipTitle.val()
      };

      // create new championship reference, then store new data
      this.createdChampionship = this.collection.create( champData );

      // show the next view
      this.currentStep = "sectionSecond";
      this.toggleSections();

      // update the total count of new users
      sys.setStatsTotal("championships");
    }

  });

});
