define(['models/session'], function(Session) {
  describe('Session', function() {
    var ses = new Session();

    it('should be defined', function() {
      expect(ses).toBeDefined();
    });

    // it('should have default attrs', function() {
    //   expect(ses.get('name')).toBeDefined();
    //   expect(ses.get('email')).toBeDefined();
    //   expect(ses.get('color')).toBeDefined();
    // });

  });
});
