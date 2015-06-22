define(['models/session', 'jquery', 'lib/jasmine-ajax', 'models/cookies'], function(Session, $, Ajax, Cookie) {
  describe('Session', function() {
    var testCreds = {
      "email": "tclarke@billabong.com",
      "password": "testtest"
    };
    var baseUrl = "https://api.parse.com/1";
    var mockedUrl = "https://api.parse.com/1/login?username=tclarke&password=testtest";

    beforeEach(function() {
      jasmine.Ajax.install();
    });
    afterEach(function() {
      jasmine.Ajax.uninstall();
    });

    it('should be defined', function() {
      expect(Session).toBeDefined();
    });

    it('should have default auth value', function() {
      expect(Session.get('auth')).toBeDefined();
    });

    describe('Requests Setup', function() {

      it("Base Url is setup", function() {
        var doneFn = jasmine.createSpy("success");

        $.ajax().then(function(args) {
          if (this.readyState == this.DONE) {
            if(this.url.search(baseUrl) > -1){
              doneFn(args);
            }
          }
        });

        expect(doneFn).not.toHaveBeenCalled();

        // fire the request
        jasmine.Ajax.requests.mostRecent().respondWith({
          "status": 200,
          "contentType": 'text/plain',
          "responseText": ""
        });

        expect(doneFn).toHaveBeenCalledWith("");
      });


      it("Base Headers are setup", function() {
        var doneFn = jasmine.createSpy("success");
        var headers;

        $.get({ url: "/" })
          .then(function(args,event,xhrMethods) {
            if (this.readyState == this.DONE) {
              doneFn(args);
            }
          });

        headers = jasmine.Ajax.requests.mostRecent().eventBus.source.requestHeaders;

        expect(doneFn).not.toHaveBeenCalled();

        jasmine.Ajax.requests.mostRecent().respondWith({
          "status": 200,
          "contentType": 'text/plain',
          "responseText": 'awesome response'
        });

        expect(doneFn).toHaveBeenCalledWith('awesome response');
        expect(headers["X-Parse-Application-Id"]).toEqual('pPeLQpgxgY9GcPuihyQ1boIH51vod9yK4nMZ1ibA');
        expect(headers["X-Parse-REST-API-Key"]).toEqual('vRKLltmPuDjdfxFFNs6ZD7iHuG5su0J6nTh0VT36');
      });

    });

    describe('.login()', function() {

      beforeEach(function () {
        spyOn(Session, 'login').and.callThrough();
      });

      it('should be defined', function() {
        expect(Session.login).toBeDefined();
      });

      it('should store token in cookie', function() {
        var token = Cookie.find("token");

        expect(token).not.toBeUndefined();
      });

      it('should login a user', function(done) {

        Session.login( testCreds )
          .then(function(res) {
            done(res.responseText);
          },function(err) {
            done(err.responseText);
          });

        jasmine.Ajax.requests.mostRecent().respondWith({
          "status": 200,
          "contentType": 'text/plain',
          "responseText": 'yep, nope'
        });

        expect(jasmine.Ajax.requests.mostRecent().url).toBe( mockedUrl );
        expect(Session.login).toHaveBeenCalled();
        expect(Session.login).toHaveBeenCalledWith('yep, nope');
      });

    });

    describe('.logout()', function() {

      beforeEach(function() {
        spyOn(Session, 'logout').and.callThrough();
      });

      it('should be defined', function() {
        expect(Session.logout).toBeDefined();
      });

      it('should logout a user', function(done) {
        Session.logout();
        done();

        jasmine.Ajax.requests.mostRecent().respondWith({
          "status": 200,
          "contentType": 'text/plain',
          "responseText": 'yep, nope'
        });

        expect(jasmine.Ajax.requests.mostRecent().url).toBe( baseUrl + "/logout" );
        expect(Session.logout).toHaveBeenCalled();
        expect(Session.logout).toHaveBeenCalledWith('yep, nope');
      });

    });

    describe('.getAuth()', function() {

      beforeEach(function() {
        spyOn(Session, 'getAuth').and.callThrough();
      });

      it('should be defined', function() {
        expect(Session.getAuth).toBeDefined();
      });

      it('should return a user session', function(done) {
        var doneFn = jasmine.createSpy("then");

        expect(doneFn).not.toHaveBeenCalled();

        Session.getAuth()
          .then(function (res, data, stuff) {
            doneFn(res.responseText);
            done();
          },function (err) {
            doneFn(err.responseText);
            done();
          });

        jasmine.Ajax.requests.mostRecent().respondWith({
          "status": 200,
          "contentType": 'text/plain',
          "responseText": 'SESSIONTOKEN'
        });

        expect(jasmine.Ajax.requests.mostRecent().url).toBe( baseUrl + "/users/me" );
        expect(Session.getAuth).toHaveBeenCalled();
        expect(doneFn).toHaveBeenCalledWith('SESSIONTOKEN');
      });

    });

    describe('.setAuth()', function() {
      var testAuthData = {
      		objectId: "C36uCWNESq",
      		createdAt: "2015-06-19T15:08:54.750Z",
      		sessionToken: "5afsHGliHVFhMGRlQ1odOYa1n"
      };

      beforeEach(function() {
        spyOn(Session, 'setAuth').and.callThrough();
      });

      it('should be defined', function() {
        expect(Session.setAuth).toBeDefined();
      });

      it('stores session correctly', function() {
        var doneFn = jasmine.createSpy();
        var foundSession;
        Session.setAuth( testAuthData );

        foundSession = Cookie.find("token");
        doneFn( foundSession );

        expect(Session.setAuth).toHaveBeenCalled();
        expect( doneFn ).toHaveBeenCalledWith( testAuthData.sessionToken );
      });

    });

    describe('.checkAuth()', function() {

      beforeEach(function() {
        spyOn(Session, 'checkAuth').and.callThrough();
      });

      it('should be defined', function() {
        expect(Session.checkAuth).toBeDefined();
      });

      it('should return valid auth check', function() {
        var isValid = Session.checkAuth();
        expect(isValid).toBeTruthy();
      });

      it('should return invalid auth check', function() {
        Session.logout();
        var isInvalid = Session.checkAuth();
        expect(isInvalid).toBeFalsy();
      });

    });

  });
});
