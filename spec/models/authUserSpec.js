define(['models/authUser'], function(AuthUser) {
  describe('AuthUser Model', function() {
    var user = new AuthUser();

    it('should be defined', function() {
      expect(user).toBeDefined();
    });

    it('should have default attrs', function() {
      expect(user.get('firstName')).toBeDefined();
      expect(user.get('lastName')).toBeDefined();
      expect(user.get('email')).toBeDefined();
    });

    it('should have validation', function() {
      expect(user.validation).toBeDefined();
    });

    it('should have default validators', function() {
      expect(user.validation.firstName).toBeDefined();
      expect(user.validation.lastName).toBeDefined();
      expect(user.validation.email).toBeDefined();
      expect(user.validation.emailSignup).toBeDefined();
      expect(user.validation.password).toBeDefined();
    });

  });
});
