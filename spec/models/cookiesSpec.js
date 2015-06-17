define(['models/cookies'], function(Cookies) {
  describe('Cookies', function() {
    var Cookie = new Cookies();
    var testToken = "fdsa543-fds54-234k-23476-fjdskSI";

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
      beforeEach(function() {
        spyOn(Cookie, 'remove').and.callThrough();
        Cookie.store("token", testToken);

        Cookie.remove("token");
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

      it('remove method can remove correctly', function() {
        var removedToken = Cookie.find("token");

        expect(removedToken).toEqual(null);
      });

    });

    // All the clearAll Method tests
    describe('.clearAll()', function() {

      it('should have method', function() {
        expect(Cookie.clearAll).toBeDefined();
      });

      it('clearAll method can remove all cookies correctly', function() {
        // create some fake cookies
        Cookie.store("A", "234ABC");
        Cookie.store("B", "23sd4ABC");
        Cookie.store("C", "234AfdsaBC");

        // then clear all the cookies
        Cookie.clearAll();
        var finalCookies = Cookie.find("C");
        expect(finalCookies).toEqual(null);
      });

    });

  });
});
