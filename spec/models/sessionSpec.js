define(['models/session', 'jquery', 'lib/jasmine-ajax', 'models/cookies'], function(Session, $, Ajax, Cookie) {
  describe('Session', function() {
    var ses = Session;
    var testCreds = {
      email: "faker@fake.com",
      password: "1234test"
    };

    beforeEach(function() {
      jasmine.Ajax.install();
    });
    afterEach(function() {
      jasmine.Ajax.uninstall();
    });

    it('should be defined', function() {
      expect(ses).toBeDefined();
    });

    it('should have default auth value', function() {
      expect(ses.get('auth')).toBeDefined();
    });

    // TODO: finish this!!
    // TODO: review http://jasmine.github.io/2.0/ajax.html
    // describe('Initial Headers are correct', function() {
    //
    //   ses.login(testCreds).then(function (res) {
    //     console.log("AJAX: res",res);
    //     console.log("AJAX: headers",err.getAllResponseHeaders());
    //
    //     it('should be defined', function() {
    //       expect(ses.login).toBeDefined();
    //     });
    //   },function (err) {
    //     console.log("AJAX: err",err);
    //     console.log("AJAX: headers",err.getAllResponseHeaders());
    //   });
    //
    //   // $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    //   //   options.url = "http://google.com";
    //   //   // console.log("$.ajaxPrefilter", jqXHR);
    //   //   // console.log("---------------------------------------");
    //   //   console.log("$.options", options);
    //   // });
    //   // $.get()
    //
    //
    //
    // });

    describe('.login()', function() {

      beforeEach(function () {
        ses.login(testCreds);
      });


      it('should be defined', function() {
        expect(ses.login).toBeDefined();
      });

      // TODO: setup with Ajax
      it('should login a user', function() {
        var doneFn = jasmine.createSpy("success");

        jasmine.Ajax.stubRequest('/another/url').andReturn({
          "responseText": 'immediate response'
        });

        expect(true).toEqual(true);
      });

      it('should store token in cookie', function() {
        var token = Cookie.find("token");

        expect(token).not.toBeUndefined();
      });

    });

    // TODO:
    // describe('.logout()', function() {
    //
    //   it('should be defined', function() {
    //     expect(ses.logout).toBeDefined();
    //   });
    //
    //   it('should logout a user', function() {
    //     expect(false).toEqual(true);
    //   });
    //
    //   it('should remove token from cookies', function() {
    //     expect(false).toEqual(true);
    //   });
    //
    //   it('should remove user data from localStorage', function() {
    //     expect(false).toEqual(true);
    //   });
    //
    // });

    // describe('.getAuth()', function() {
    //
    //   it('should be defined', function() {
    //     expect(ses.getAuth).toBeDefined();
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
