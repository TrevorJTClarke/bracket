define(['models/user'], function(User) {
  describe('User', function() {
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

  });
});
