define([
  'underscore',
  'backbone',
  'hbars!templates/notifier'
],
function(
  _,
  Backbone,
  notifyTpl
){

  // Quick model setup
  var NotifierModel = Backbone.Model.extend({
    defaults: {
      title: "",
      duration: 4000
    }
  });

  // PRIVATE METHODS
  var NotifierView = Backbone.View.extend({

    timers: [],
    isActive: false,

    el: ".notify",

    model: new NotifierModel(),

    initialize: function () {
      return this;
    },

    render: function ( data ) {
      data = data || {};
      this.template = _.template(notifyTpl( data ));
      this.$el.html(this.template);
    },

    // THIS IS HACK:Y!
    fire: function ( data ) {
      if(!data){return;}
      var _self = this;
      var dur = parseInt(_self.model.get("duration"),10);

      if(_self.isActive === true){
        _self.clearAll();
        _self.isActive = false;
      }

      this.render( data );
      _self.$el.addClass( data.type );
      _self.$el.addClass("active");
      _self.isActive = true;

      _self.timers[0] = setTimeout(function(){
        _self.$el.removeClass("active");
      }, dur + 10);

      _self.timers[0] = setTimeout(function(){
        _self.$el.removeClass("error success info warning");
        _self.isActive = false;
      }, dur + 240);
    },

    clearAll: function () {
      var _self = this;
      _.each(_self.timers,function (obj, idx) {
        window.clearTimeout(_self.timers[idx]);
      });
    }
  });

  var Notifier = new NotifierView();

  // SETUP
  Backbone.Notifier = {};
  _.extend(Backbone.Notifier, Backbone.Events);

  Backbone.Notifier.on("NOTIFY:GLOBAL", function (args) {
    Notifier.fire( args );
  });

});
