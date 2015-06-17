define(['models/session', 'jquery'], function(Session, $) {
  describe('Session', function() {
    var ses = Session;

    it('should be defined', function() {
      expect(ses).toBeDefined();
    });

    it('should have default auth value', function() {
      expect(ses.get('auth')).toBeDefined();
    });

    // TODO: finish this!!
    describe('Initial Headers are correct', function() {
      $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        console.log("$.ajaxPrefilter", jqXHR);
        console.log("---------------------------------------");
        console.log("$.options", options);
      });
      $.ajax();

      it('should be defined', function() {
        expect(ses.login).toBeDefined();
      });

    });

    describe('.login()', function() {

      it('should be defined', function() {
        expect(ses.login).toBeDefined();
      });

      it('should login a user', function() {
        expect(false).toEqual(true);
      });

      it('should store token in cookie', function() {
        expect(false).toEqual(true);
      });

      it('should store user data in localStorage', function() {
        expect(false).toEqual(true);
      });

    });

    describe('.logout()', function() {

      it('should be defined', function() {
        expect(ses.logout).toBeDefined();
      });

      it('should logout a user', function() {
        expect(false).toEqual(true);
      });

      it('should remove token from cookies', function() {
        expect(false).toEqual(true);
      });

      it('should remove user data from localStorage', function() {
        expect(false).toEqual(true);
      });

    });

    describe('.getAuth()', function() {

      it('should be defined', function() {
        expect(ses.getAuth).toBeDefined();
      });

      it('should return a user session', function() {
        expect(false).toEqual(true);
      });

      it('should return user data', function() {
        expect(false).toEqual(true);
      });

    });

  });
});
