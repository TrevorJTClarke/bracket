// HeaderModel Testing
define(['models/ChampionshipModel', 'jquery', 'underscore'], function(ChampionshipModel, $, _) {
    describe("ChampionshipModel", function() {
        var CM = new ChampionshipModel();

        it("should be defined", function() {
            expect(CM).toBeDefined();
        });

        it("should have default attrs", function() {
            expect(CM.get("title")).toBeDefined();
            expect(CM.get("users")).toBeDefined();
            expect(CM.get("bracket")).toBeDefined();
        });

        describe(".createNew()", function() {
            beforeEach(function() {
                spyOn(CM, 'createNew').and.callThrough();

                CM.createNew({ title: "test title" });
            });

            it("should have method", function() {
                expect(CM.createNew).toBeDefined();
                expect(CM.createNew).toHaveBeenCalled();
            });

            it("can set the title", function() {
                expect(CM.createNew).toHaveBeenCalledWith({ title: "test title" });
            });

            it("correctly sets the data", function() {
                var data = CM.get("title");
                expect(data).toEqual("test title");
            });
        });

        describe(".addUser()", function() {
            beforeEach(function() {
                spyOn(CM, 'addUser').and.callThrough();

                CM.addUser({ id: "5u43io-543fdos-fjdksl-riew98787", firstName: "Test", lastName: "User" });
            });

            it("should have method", function() {
                expect(CM.addUser).toBeDefined();
                expect(CM.addUser).toHaveBeenCalled();
            });

            it("can set the user data", function() {
                expect(CM.addUser).toHaveBeenCalledWith({ id: "5u43io-543fdos-fjdksl-riew98787", firstName: "Test", lastName: "User" });
            });

            it("correctly sets the data", function() {
                var data = CM.get("users");
                var firstUserName = data["5u43io-543fdos-fjdksl-riew98787"].firstName;
                expect(firstUserName).toEqual("Test");
            });
        });

        describe(".getUserById()", function() {

            it("should have method", function() {
                expect(CM.getUserById).toBeDefined();
            });

            it("get by Tier Key", function() {
                spyOn(CM, 'getUserById').and.callThrough();
                var tierData = CM.getUserById("tier_1");

                expect(CM.getUserById).toHaveBeenCalled();
                // expect(tempTiers).toEqual(1);
            });

        });

        describe(".addTier()", function() {
            var bracketData = CM.get("bracket");
            var previousTiers = (bracketData && bracketData.tiers)? bracketData.tiers : 0;

            it("should have method", function() {
                expect(CM.addTier).toBeDefined();
            });

            it("can set the tier data", function() {
                spyOn(CM, 'addTier').and.callThrough();
                CM.addTier();

                var tempData = CM.get("bracket");
                var tempTiers = (tempData && tempData.tiers)? tempData.tiers : 0;

                expect(CM.addTier).toHaveBeenCalled();
                expect(tempTiers).toEqual(1); // since we called it twice
            });

            it("created new Tier Key", function() {
                var tempData = CM.get("bracket");
                var newTierData = tempData["tier_1"];
                expect(newTierData).toBeDefined();
            });
        });

        describe(".getTierById()", function() {

            it("should have method", function() {
                expect(CM.getTierById).toBeDefined();
            });

            it("get by Tier Key", function() {
                spyOn(CM, 'getTierById').and.callThrough();
                var tierData = CM.getTierById("tier_1");

                expect(CM.getTierById).toHaveBeenCalled();
                // expect(tempTiers).toEqual(1);
            });

        });

        describe(".addUserToTier()", function() {
            var testData = {
                tiers: 1,
                tier_1: [{
                    users: ["5u43io-543fdos-fjdksl-riew98787"],
                    winner: null,
                    status: 'new'
                }]
            };

            it("should have method", function() {
                expect(CM.addUserToTier).toBeDefined();
            });

            it("validates needed data", function() {
                var failedMethod1 = CM.addUserToTier();
                var failedMethod2 = CM.addUserToTier("tier1");

                expect(failedMethod1).toBeFalsy();
                expect(failedMethod2).toBeFalsy();
            });

            it("adds user to correct postion", function() {
                spyOn(CM, 'addUserToTier').and.callThrough();
                CM.addUserToTier("tier_1", "5u43io-543fdos-fjdksl-riew98787");
                var tierData = CM.get("bracket");

                expect(CM.addUserToTier).toHaveBeenCalled();
                expect(tierData["tier_1"][0].users[0]).toEqual(testData["tier_1"][0].users[0]);
            });

            it("tier data is correct", function() {
                spyOn(CM, 'addUserToTier').and.callThrough();
                CM.addUserToTier("tier_1", "5u43io-543fdos-fjdksl-riew98787");
                var tierData = CM.get("bracket");

                expect(tierData).toEqual(testData);
            });

        });
    });
});
