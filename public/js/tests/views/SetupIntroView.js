// HeaderModel Testing
define(['views/SetupIntroView', 'jasminequery', 'underscore', "text!templates/setup_intro.html"], function(SetupIntroView, $, _, tmpl) {
    describe("SetupIntroView", function() {
        // var SV = new SetupIntroView();

        beforeEach(function() {
            this.view = new SetupIntroView();
        });

        it("should be defined", function() {
            expect(this.view).toBeDefined();
        });

        // TEST TODO:
        // render
        // all functions
        // events
        //

        it("should have render element", function() {
            expect(this.view.$el).toBeDefined();
        });

        it("should have equal values", function() {
            expect(this.view.testform).toBeDefined();
        });
    });
});
