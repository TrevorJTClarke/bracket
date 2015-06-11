define(['models/header'], function(Header) {
  describe('Header', function() {
    var header = new Header();

    it('should be defined', function() {
      expect(header).toBeDefined();
    });

    it('should have default attrs', function() {
      expect(header.get('something')).toBeDefined();
    });

    it('should have equal values', function() {
      expect(header.get('something')).toEqual('hi');
    });
  });
});
