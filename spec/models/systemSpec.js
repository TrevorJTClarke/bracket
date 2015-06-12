define(['models/system'], function(System) {
  describe('System', function() {
    var sys = new System();

    it('should be defined', function() {
      expect(sys).toBeDefined();
    });

    it('should have default attrs', function() {
      expect(sys.get('Firebase')).toBeDefined();
    });

    it('Firebase urls are set properly', function() {
      var FB = sys.get('Firebase');
      expect(FB.ROOT).toEqual("https://flickering-heat-8044.firebaseio.com");
    });

  });
});
