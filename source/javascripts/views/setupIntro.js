define([
  'jquery',
  'backbone',
  'collections/championships',
  'models/championship',
  'hbars!templates/setup_intro',
  'hbars!templates/player_listing_item',
  'models/stats',
  'models/system'
],
function(
  $,
  Backbone,
  Championships,
  Championship,
  setupTpl,
  playerListTpl,
  Stats,
  System
){
  // SETUP
  var players = [];

  return Backbone.View.extend({

    el: '.main-container',

    model: new Championship,

    events: {
      'click #newChampionship': 'startChampionship'
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
        this.$("#" + this.currentStep).addClass("show");
      }
    },

    startChampionship: function (e) {
      if(e) {
        e.preventDefault();
      }
      if (!this.championshipTitle.val()){ return; }
      var _self = this;
      var champData = {
        title: _self.championshipTitle.val()
      };

      // create new championship reference, then store new data
      _self.model.set( champData )
        .save()
        .then(function(res) {
          // console.log("res",res.attributes);
        }, function (err) {
          console.log("err",err);
        });


      // show the next view
      this.currentStep = "sectionSecond";
      this.toggleSections();

      // update the total count of new users
      // Stats().getMain().increment("championships");

      // start the next view
      this.addPlayers();

      return this;
    },

    addPlayers: function () {
      var _self = this;
      var userData = Parse.Object.extend("User");
      var query = new Parse.Query(userData);
      query.limit(10)
          .find()
          .then(function (res) {
            // console.log("res",res);
            var Players = Parse.Object.extend("ChampionshipPlayers");
            var plrs = new Players();

            res.forEach(function (obj,idx) {
              var tempUser = obj.attributes;
                  tempUser.id = obj.id;

              players.push(tempUser);

              plrs.addUnique("players", obj.id);

            })

            _self.render();
            plrs.save()
                .then(function(res) {
                  console.log("plrs res",res);

                  _self.model.set({ "players_ref": res.id }).save();
                }, function (err) {
                  console.log("err",err);
                });

          });
    }

  });

});
