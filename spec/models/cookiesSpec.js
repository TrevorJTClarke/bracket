define(['models/cookies'], function(Cookies) {
  describe('Cookies', function() {
    var Cookie = Cookies;
    var testToken = "fdsa543-fds54-234k-23476-fjdskSI";

    afterEach(function (done) {
      Cookie.clearAll();
      setTimeout(function(){
        done();
      },4);
    });

    it('should be defined', function() {
      expect(Cookie).toBeDefined();
    });

    it('should have a keys array', function() {
      expect(Cookie.keys).toBeDefined();
    });

    // All the store Method tests
    describe('.store()', function() {
      beforeEach(function() {
        spyOn(Cookie, 'store').and.callThrough();

        Cookie.store("token", testToken);
      });

      afterEach(function () {
        Cookie.clearAll();
      });

      it('should have method', function() {
        expect(Cookie.store).toBeDefined();
        expect(Cookie.store).toHaveBeenCalled();
      });

      it('can store the token', function() {
        expect(Cookie.store).toHaveBeenCalledWith("token", testToken);
      });
    });

    // All the find Method tests
    describe('.find()', function() {
      var gotToken = "";

      beforeEach(function() {
        spyOn(Cookie, 'find').and.callThrough();
        Cookie.store("token", testToken);

        gotToken = Cookie.find("token");
      });

      afterEach(function () {
        Cookie.clearAll();
      });

      it('should have method', function() {
        expect(Cookie.find).toBeDefined();
        expect(Cookie.find).toHaveBeenCalled();
      });

      it('can find the token', function() {
        expect(Cookie.find).toHaveBeenCalledWith("token");
      });

      it('find method returns correct data', function() {
        expect(gotToken).toEqual(testToken);
      });
    });

    // All the remove Method tests
    describe('.remove()', function() {
      beforeEach(function(done) {
        spyOn(Cookie, 'remove').and.callThrough();
        Cookie.store("token", testToken);


        setTimeout(function(){
          Cookie.remove("token");
          done();
        },4);
      });

      afterEach(function () {
        Cookie.clearAll();
      });

      it('should have method', function() {
        expect(Cookie.remove).toBeDefined();
        expect(Cookie.remove).toHaveBeenCalled();
      });

      it('can remove the token', function() {
        expect(Cookie.remove).toHaveBeenCalledWith("token");
      });

      it('remove method can remove correctly', function(done) {
        var removedToken;

        setTimeout(function () {
          removedToken = Cookie.find("token");

          done();
        },10);
        expect(removedToken).toBeUndefined();

      });

    });

    // All the clearAll Method tests
    describe('.clearAll()', function() {

      beforeEach(function(done) {
        spyOn(Cookie, 'clearAll').and.callThrough();
        // create some fake cookies
        Cookie.store("A", "234ABC");
        Cookie.store("B", "23sd4ABC");
        Cookie.store("C", "234AfdsaBC");

        setTimeout(function(){
          done();
        },4);
      });

      it('should have method', function() {
        expect(Cookie.clearAll).toBeDefined();
      });

      it('clearAll method can remove all cookies correctly', function(done) {
        var finalCookies;

        // then clear all the cookies
        Cookie.clearAll();

        setTimeout(function () {
          finalCookies = Cookie.find("C");
          done();
        },10);
        expect(finalCookies).toBeUndefined();
      });

    });

  });
});
