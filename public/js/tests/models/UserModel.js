// HeaderModel Testing
define(['models/UserModel', 'jquery', 'underscore'], function(UserModel, $, _) {
    describe("UserModel", function() {
        var UM = new UserModel();

        it("should be defined", function() {
            expect(UM).toBeDefined();
        });

        it("should have default attrs", function() {
            expect(UM.get("firstName")).toBeDefined();
            expect(UM.get("lastName")).toBeDefined();
            expect(UM.get("email")).toBeDefined();
            expect(UM.get("stats")).toBeDefined();
            expect(UM.get("preferences")).toBeDefined();
        });

    });
});
