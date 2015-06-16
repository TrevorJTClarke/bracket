define(['models/system'], function(System) {
  describe('System', function() {
    var sys = new System();

    it('should be defined', function() {
      expect(sys).toBeDefined();
    });

    it('should have default attrs', function() {
      expect(sys.get('Parse')).toBeDefined();
    });

    it('Parse urls are set properly', function() {
      var PS = sys.get('Parse');
      expect(PS.API_KEY).toEqual("pPeLQpgxgY9GcPuihyQ1boIH51vod9yK4nMZ1ibA");
    });

  });
});
