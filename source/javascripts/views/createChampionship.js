define([
  'jquery',
  'Q',
  'backbone',
  'models/championship',
  'models/championshipPlayers',
  'hbars!templates/create_championship',
  'hbars!templates/player_listing_item',
  'models/system',
  'models/notifier'
],
function(
  $,
  Q,
  Backbone,
  Championship,
  ChampionshipPlayers,
  createChampionshipTpl,
  playerListTpl,
  System
){
  // SETUP
  var players = [];
  var PS = System.get("Parse");

  // PRIVATE METHODS
  var _rootEl = $(".main-container");
  var CP = new ChampionshipPlayers();

  // Stores the players reference into model
  function storePlayersRef( modelId, playersArray ) {
    // var dfd = Q.defer();
    // var url = PS.CLASSES + PS.CHAMPIONSHIP + "/" + modelId;
    // var data = {
    //   "players": {
    //     "__op":"AddRelation",
    //     "objects":[{
    //       "__type": "Pointer",
    //       "className": "ChampionshipPlayers",
    //       "objectId": playersId
    //     }]
    //   }
    // };
    //
    // $.ajax({
    //   url: url,
    //   type: 'PUT',
    //   data: JSON.stringify(data),
    //   dataType: "json",
    //   "contentType": "application/json",
    //   success: dfd.resolve,
    //   error: dfd.reject
    // });
    //
    // return dfd.promise;

    var dfd = Q.defer();
    var url = PS.CLASSES + PS.CHAMPIONSHIP + "/" + modelId;
    var data = {
      "players": {
        "__op":"AddRelation",
        "objects":[]
      }
    };
    // var data = {
    //   players: []
    // };

    for (var i = 0; i < playersArray.length; i++) {
      data.players.objects.push({
        '__type': 'Pointer',
        // 'className': 'ChampionshipPlayers',
        'className': '_User',
        'objectId': playersArray[i]
      });
      // data.players.push(playersArray[i]);
    }
    console.log("data",data);

    $.ajax({
      url: url,
      type: 'PUT',
      data: JSON.stringify(data),
      dataType: 'json',
      contentType: 'application/json',
      success: dfd.resolve,
      error: dfd.reject
    });

    return dfd.promise;
  }

  return Backbone.View.extend({

    tagName: 'div',
    className: 'create-championship',

    model: new Championship,

    events: {
      'click #newChampionship': 'startChampionship',
      'click #doneAddingPlayers': 'finishCreating'
    },

    initialize: function() {
      var _self = this;
      _self.currentStep = "sectionFirst";
      _self.render();
      _self.championshipTitle = this.$el.find("#chTitle");

      // CP.getPlayers(["n9AZCPxMHF","B8D8hHd9Sx"])
      //   .then(function (ress) {
      //     console.log("ress",ress);
      //   },function (errr) {
      //     console.log("errr",errr);
      //   });

      return this;
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
          // update the current championship data model
          _self.model.set( res );

          CP.getAvailablePlayers()
            .then(function (res) {
              players = res;
              _self.render();
              // show the next view
              _self.currentStep = "sectionSecond";
              _self.toggleSections();

              // bind add/remove events
              _self.bindPlayers();

              // TODO: this should be handled in the events, WHYA?!
              _self.$el.find("#doneAddingPlayers").on("click", function() {
                _self.finishCreating();
              });
            },function (err) {
              Backbone.Notifier.trigger("NOTIFY:GLOBAL", { type: "error", title: err });
            });
        }, function (err) {
          Backbone.Notifier.trigger("NOTIFY:GLOBAL", { type: "error", title: err });
        });
    },

    finishCreating: function () {
      var __self = this;
      var playerIds = [];

      players.map(function (obj) {
        if(obj.added === true || obj.admin === true){
          playerIds.push(obj.id);
        }
      });

      var champId = __self.model.get("objectId");
      CP.savePlayers( champId, playerIds )
        .then(function (res) {

            console.log("savePlayers finished res",res);
            // TODO: navigation to tier setup flow
        }, function (err) {
          console.log("savePlayers err",err);
        });
    },

    toggleAddPlayer: function ( item ) {
      // item.added = !item.added;
      players.map(function (obj,idx) {
        if(obj.id === item.id){
          players[idx].added = !players[idx].added;
          return;
        }
      });
    },

    bindPlayers: function () {
      var _self = this;
      players.map(function (obj,idx) {
        var playerData = obj;
        // bind each button
        _self.$el.find("#player_" + obj.id).on("click", function(args){
          $(this).toggleClass("active");
          _self.toggleAddPlayer( playerData );
        });
      });
    }

  });

});
