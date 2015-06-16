define([
  'models/user'
], function(
  User
) {

  return Backbone.Collection.extend({

    model: User

  });

});
