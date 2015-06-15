define(['views/setupIntro'], function(SetupIntroView) {
  describe("SetupIntroView", function() {
    beforeEach(function() {
      this.view = new SetupIntroView();
    });

    it("should be defined", function() {
      expect(this.view).toBeDefined();
    });

    it("should have render element", function() {
      expect(this.view.$el).toBeDefined();
    });

    it("should have working events", function() {
      var events = this.view.events;
      var eventLngth = Object.keys(events).length;

      expect(events).toBeDefined();
      expect(eventLngth).toBeGreaterThan(0);
    });
  });
});
