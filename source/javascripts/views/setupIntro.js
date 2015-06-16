define([
  'jquery',
  'backbone',
  'collections/championships',
  'collections/users',
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
  Users,
  Championship,
  setupTpl,
  playerListTpl,
  Stats,
  System
){
  // SETUP
  var sys = new System();
  var players = [];

  // TEST:
  //
  // var players = [{
  //   initials: "TC",
  //   name: "Trevor Clarke",
  //   email: "tclarke@billabong.com",
  //   color: "2FAB70"
  // },{
  //   initials: "MD",
  //   name: "Michael Deol",
  //   email: "mdeol@billabong.com",
  //   color: "333333"
  // },{
  //   initials: "SP",
  //   name: "Super Person",
  //   email: "sperson@billabong.com",
  //   color: "483989"
  // },{
  //   initials: "YK",
  //   name: "Yik Yak",
  //   email: "yyak@billabong.com",
  //   color: "092323"
  // }];

  return Backbone.View.extend({

    el: '.setup-intro',

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
        this.$("#" + this.currentStep).toggleClass("show");
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
                  console.log("res",res.attributes);
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
            console.log("res",res);

            res.forEach(function (obj,idx) {
              var tempUser = obj.attributes;
                  tempUser.id = obj.id;

              players.push(tempUser);
            })

            _self.render();
          });
    }

  });

});
