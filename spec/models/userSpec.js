define(['models/user'], function(User) {
  describe('User Model', function() {
    var user = User;

    it('should be defined', function() {
      expect(user).toBeDefined();
    });

    it('should have default attrs', function() {
      expect(user.get('firstName')).toBeDefined();
      expect(user.get('lastName')).toBeDefined();
      expect(user.get('email')).toBeDefined();
    });

    describe('.cache()', function() {
      var userData;

      beforeEach(function() {
        spyOn(user, 'cache').and.callThrough();
        user.cache();
      });

      it('should have method', function() {
        expect(user.cache).toBeDefined();
      });

      it('should cache user data', function() {
        expect(user.cache).toHaveBeenCalled();
      });

      it('verified user data in localStorage', function() {
        userData = localStorage.getItem('br-user');
        expect(userData).not.toBeUndefined();
      });

    });

    describe('.remove()', function() {

      beforeEach(function() {
        spyOn(user, 'remove').and.callThrough();
        user.remove();
      });

      it('should have method', function() {
        expect(user.remove).toBeDefined();
      });

      it('should remove cached user data', function() {
        expect(user.remove).toHaveBeenCalled();
      });

      it('verified cleared user data from localStorage', function() {
        var userData = localStorage.getItem('br-user');
        expect(userData).toBeNull();
      });

    });

    describe('.getPlayer()', function() {
      it('should retrieve the related player item', function() {
        var gotPlayer = user.getPlayer();

        expect(gotPlayer.promiseDispatch).toBeDefined();
      });
    });

    describe('.getAllChampionships()', function() {
      it('should retrieve the related championship items', function() {
        // need to set the player ID before we can run the request
        user.set('playerId', '123456');
        var gotChamps = user.getAllChampionships();

        expect(gotChamps.promiseDispatch).toBeDefined();
      });
    });

  });
});
