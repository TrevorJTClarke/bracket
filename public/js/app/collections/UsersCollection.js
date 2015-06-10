// UsersCollection.js
// -------------
define(["models/UserModel"],
function(UserModel) {

    // Creates a new Backbone Collection class object
    var UsersCollection = Backbone.Collection.extend({

      // Tells the Backbone Collection that all of it's models will be of type Model (listed up top as a dependency)
      model: UserModel

    });

    // Returns the Model class
    return UsersCollection;

});
