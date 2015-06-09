// HeaderModel Testing
define(['views/SetupIntroView', 'jquery', 'underscore', "text!templates/setup_intro.html"], function(SetupIntroView, $, _, tmpl) {
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

        it("should have testform method", function() {
            expect(this.view.testform).toBeDefined();
        });

        it("testform should return false", function() {
            expect(this.view.testform()).toBeFalsy();
        });

        it("should have working events", function() {
            var events = this.view.events;
            var eventLngth = Object.keys(events).length;

            expect(events).toBeDefined();
            expect(eventLngth).toBeGreaterThan(0);
        });
    });
});
