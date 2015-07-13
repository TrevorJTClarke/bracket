define(['routers/mainRouter'], function(MainRouter) {
  var MR = new MainRouter();

  // Not loading all routes, since they should be in their own tests based on their views.
  describe('MainRouter', function() {

    it('should be defined', function() {
      expect(MR).toBeDefined();
      expect(MR.routes).toBeDefined();
    });

    it('should have .loadView method', function() {
      expect(MR.loadView).toBeDefined();
    });

    it('should have main config routes', function() {
      expect(MR.routes.login).toBeDefined();
    });

    it('should return a template from load', function() {
      MR.loadView('login');
      expect(MR.view).toBeDefined();
    });
  });
});
