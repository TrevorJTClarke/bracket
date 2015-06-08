// HeaderModel Testing
define(['views/SetupIntroView', 'jquery', 'underscore'], function(SetupIntroView, $, _) {
    describe("SetupIntroView", function() {
        var SV = new SetupIntroView();

        it("should be defined", function() {
            expect(SV).toBeDefined();
        });

        // it("should have default attrs", function() {
        //     expect(HM.get("something")).toBeDefined();
        // });
        //
        // it("should have equal values", function() {
        //     expect(HM.get("something")).toEqual("hi");
        // });
    });
});
