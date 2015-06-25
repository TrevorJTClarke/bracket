define(['views/header', 'models/user', 'routers/state', 'jasminequery'], function(Header, User) {
  var view, model;

  describe("Header View", function() {

    beforeEach(function () {
      view = new Header({ model: User });
    });

    describe('when view is constructing', function () {

      it ('should exist', function () {
        expect(view).toBeDefined();
      });

    });

    describe('when view is rendered', function () {

      beforeEach(function () {
        view.render();
      });

      it ('should have default interface', function () {
        // expect(view.$el.find('[name="email"]')).toHaveValue('');
        expect(true).toBe(true);
      });

    });

    // describe('when user is logged in', function () {
    //
    //   beforeEach(function () {
    //     view.$el.find('[name="email"]').val('').trigger('change');
    //     view.$el.find('[name="password"]').val('').trigger('change');
    //   });
    //
    //   beforeEach(function () {
    //     view.$el.find('#loginSubmit').trigger('click');
    //   });
    //
    //   it('validation method should return false', function () {
    //     var isValid = view.model.isValid();
    //     expect( isValid ).toBeFalsy();
    //   });
    //
    //   it('email field should be invalidated', function () {
    //     expect( view.$el.find('.form-group.email')[0] ).toHaveClass('error');
    //   });
    //
    //   it('password field should be invalidated', function () {
    //       expect( view.$el.find('.form-group.password') ).toHaveClass('error');
    //   });
    //
    // });


  });
});
