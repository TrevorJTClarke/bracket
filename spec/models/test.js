

describe("Player Model", function() {
    it("has valid defaults", function() {
        var todoItem = Player.prototype.defaults();
        var mainDefaults = {
            title: "empty todo...",
            order: 1,
            done: false
        };
        // console.log("fdsafdas",Todo.prototype.defaults());
        // expect(todoItem).toEqual(mainDefaults);
        expect(todoItem.title).toContain("New");
        // expect(todoItem.order).toBeLessThan(2);
        // expect(todoItem.done).toBeFalsy();
        // expect(todoItem.id).toBeUndefined();
    });
    //
    // describe("Todo Toggle Method", function() {
    //     var toggleItem = Todo.prototype.toggle,
    //         toggleProto = Todo.prototype,
    //         toggleResult;
    //
    //     beforeEach(function() {
    //         spyOn(Todo.prototype, 'toggle').and.callThrough();
    //
    //         toggleItem();
    //     });
    //
    //     it("has working toggle", function() {
    //         var todoItem = Todo.prototype.defaults();
    //
    //         expect(true).toBeTruthy();
    //     });
    // });
});
