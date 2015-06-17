define(['models/user'], function(User) {
  describe('User', function() {
    var user = new User();

    it('should be defined', function() {
      expect(user).toBeDefined();
    });

    it('should have default attrs', function() {
      expect(user.get('firstName')).toBeDefined();
      expect(user.get('lastName')).toBeDefined();
      expect(user.get('email')).toBeDefined();
    });

  });
});
