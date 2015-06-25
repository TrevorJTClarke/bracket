define([
  'jquery',
  'Q',
  'backbone',
  'collections/championships',
  'models/championship',
  'hbars!templates/create_championship',
  'hbars!templates/player_listing_item',
  'models/system',
  'models/notifier'
],
function(
  $,
  Q,
  Backbone,
  Championships,
  Championship,
  createChampionshipTpl,
  playerListTpl,
  System
){
  // SETUP
  var players = [];
  var PS = System.get("Parse");

  // PRIVATE METHODS
  var _rootEl = $(".main-container");

  // Grab root list of players and only return needed data
  function getAvailablePlayers() {
    var dfd = Q.defer();
    var _self = this;
    var url = PS.CLASSES + PS.USER;

    function formatList (array) {
      var finArray = [];
      var me = localStorage.getItem("br-user");
          me = JSON.parse(me);

      array.map(function (obj,idx) {
        if(obj.username !== "a"){
          // only add needed data
          var addUser = {
            id: obj.id,
            firstName: obj.firstName,
            lastName: obj.lastName,
            email: obj.email,
            color: obj.color,
            initials: obj.initials,
            added: false
          };

          if(obj.username === me.username){
            addUser.email = "Championship Creator";
            addUser.admin = true;
          }

          finArray.push( addUser );
        }
      });

      return finArray;
    }

    $.get( url )
      .success(function (res) {
        console.log(res);
        players = formatList( res.results );

        dfd.resolve(players);
      })
      .error( dfd.reject );

    return dfd.promise;
  }

  return Backbone.View.extend({

    tagName: 'div',
    className: 'create-championship',

    model: new Championship,

    events: {
      'click #newChampionship': 'startChampionship'
    },

    initialize: function() {
      var _self = this;
      // this.currentStep = "sectionFirst";
      this.currentStep = "sectionSecond";
      this.championshipTitle = this.$("#chTitle");

      // TESTING:
      getAvailablePlayers();
      setTimeout(function(){
        _self.render();
      },550);

      // this.model = new Championship();
      // this.model.set('users', UsersCollection);
      // this.listenTo(this.model, "change", this.render);
    },

    // Renders the view's template to the UI
    render: function() {
      var _self = this;
      // Setting the view's template property using the Underscore template method
      this.template = _.template(createChampionshipTpl({
        playerListTpl: playerListTpl({
          players: players
        })
      }));

      // Dynamically updates the UI with the view's template
      this.$el.html(this.template);
      _rootEl.html(_self.$el);

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
      if (!this.championshipTitle.val()){
        Backbone.Notifier.trigger("NOTIFY:GLOBAL", { type: "info", title: "Please enter a championship title!" });
        return;
      }
      var _self = this;
      var champData = {
        title: _self.championshipTitle.val()
      };

      // create new championship reference, then store new data
      _self.model.set( champData )
        .save()
        .then(function(res) {
          console.log("res",res);
          _self.render();
          // show the next view
          _self.currentStep = "sectionSecond";
          _self.toggleSections();
        }, function (err) {
          Backbone.Notifier.trigger("NOTIFY:GLOBAL", { type: "error", title: err });
        });


      // show the next view
      // this.currentStep = "sectionSecond";
      // this.toggleSections();

      // TODO:
      // update the total count of new users
      // Stats().getMain().increment("championships");

      // start the next view
      this.addPlayers();

      return this;
    },

    addPlayers: function () {
      console.log("TODO: addPlayers");
      // var _self = this;
      // var userData = Parse.Object.extend("User");
      // var query = new Parse.Query(userData);
      // query.limit(10)
      //     .find()
      //     .then(function (res) {
      //       // console.log("res",res);
      //       var Players = Parse.Object.extend("ChampionshipPlayers");
      //       var plrs = new Players();
      //
      //       res.forEach(function (obj,idx) {
      //         var tempUser = obj.attributes;
      //             tempUser.id = obj.id;
      //
      //         players.push(tempUser);
      //
      //         plrs.addUnique("players", obj.id);
      //
      //       })
      //
      //       _self.render();
      //       plrs.save()
      //           .then(function(res) {
      //             console.log("plrs res",res);
      //
      //             _self.model.set({ "players_ref": res.id }).save();
      //           }, function (err) {
      //             console.log("err",err);
      //           });
      //
      //     });
    }

  });

});
