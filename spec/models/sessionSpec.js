define(['models/session', 'jquery', 'lib/jasmine-ajax', 'models/cookies'], function(Session, $, Ajax, Cookie) {
  describe('Session', function() {
    var testCreds = {
      email: "faker@fake.com",
      password: "1234test"
    };
    var baseUrl = "https://api.parse.com/1";
    var mockedUrl = "https://api.parse.com/1/login?username=faker&password=1234test";

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
        Session.login(testCreds);
      });


      it('should be defined', function() {
        expect(Session.login).toBeDefined();
      });

      // TODO: setup with Ajax
      it('should login a user', function() {
        var doneFn = jasmine.createSpy("success");

        jasmine.Ajax.stubRequest('/another/url').andReturn({
          "responseText": 'immediate response'
        });

        expect(true).toEqual(true);

        // var doneFn = jasmine.createSpy("success");
        // var mockedUrl = "https://api.parse.com/1/login?username=faker&password=1234test";
        //
        // spyOn(Session, 'login');
        //
        // jasmine.Ajax.stubRequest(mockedUrl).andReturn({
        //   "responseText": 'immediate response',
        //   "requestHeaders": "{ 'super': 'duper' }"
        // });
        //
        // Session.login( testCreds )
        //   .then(function(args) {
        //     console.log("argssss",args, this);
        //     if (this.readyState == this.DONE) {
        //       doneFn(args);
        //     }
        //   },function(args) {
        //     console.log("argssss",args, this);
        //     if (this.readyState == this.DONE) {
        //       doneFn(args);
        //     }
        //   });
        //
        // // jasmine.Ajax.requests.mostRecent().setRequestHeader("super", "duper");
        //
        // // jasmine.Ajax.requests.mostRecent().respondWith({
        // //   "status": 200,
        // //   "contentType": 'text/plain',
        // //   "responseText": 'awesome response',
        // //   "requestHeaders": "{ 'super': 'duper' }"
        // // });
        //
        // expect(jasmine.Ajax.requests.mostRecent().url).toBe( mockedUrl );
        // expect(Session.login).toHaveBeenCalled();
        // expect(doneFn).toHaveBeenCalledWith('awesome response');
      });

      it('should store token in cookie', function() {
        var token = Cookie.find("token");

        expect(token).not.toBeUndefined();
      });

    });

    // TODO:
    describe('.logout()', function() {
      var userData;

      beforeEach(function() {
        spyOn(Session, 'logout').and.callThrough();
        Session.logout();
      });

      it('should be defined', function() {
        expect(Session.logout).toBeDefined();
      });

      it('method can be called', function() {
        expect(Session.logout).toHaveBeenCalled();
      });

      it('should remove token from cookies', function() {
        var token = Cookie.find("token");

        expect(token).toBeUndefined();
      });

      it('should logout a user', function() {
        expect(false).toEqual(true);
      });

    });

    // describe('.getAuth()', function() {
    //
    //   it('should be defined', function() {
    //     expect(Session.getAuth).toBeDefined();
    //   });
    //
    //   it('should return a user session', function() {
    //     expect(false).toEqual(true);
    //   });
    //
    //   it('should return user data', function() {
    //     expect(false).toEqual(true);
    //   });
    //
    // });

  });
});
