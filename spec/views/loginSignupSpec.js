define(['views/loginSignup', 'models/user', 'backbone.validation', 'jasminequery'], function(LSV, User, Validation) {
  var view, model;

  describe("Login/Signup View", function() {

    beforeEach(function () {
      view = new LSV({ model: User  });
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

      it ('email field should be empty', function () {
        expect(view.$el.find('[name="email"]')).toHaveValue('');
      });

      it ('password field should be empty', function () {
        expect(view.$el.find('[name="password"]')).toHaveValue('');
      });

    });

    describe('when login form is submitted', function () {

      describe('no inputs are filled', function () {

        beforeEach(function () {
          view.$el.find('[name="email"]').val('').trigger('change');
          view.$el.find('[name="password"]').val('').trigger('change');
        });

        beforeEach(function () {
          view.$el.find('#loginSubmit').trigger('click');
        });

        it('email field should be invalidated', function () {
          expect( view.$el.find('.form-group.email') ).toHaveClass('error');
        });

        // it('password field should be invalidated', function () {
        //     expect( view.$el.find('.form-group.password') ).toHaveClass('error');
        // });

      });

      describe('only email field filled', function () {

        beforeEach(function () {
          view.$el.find('[name="email"]').val('a@a.com').trigger('change');
          view.$el.find('[name="password"]').val('').trigger('change');
        });

        beforeEach(function () {
          view.$el.find('#loginSubmit').trigger('click');
        });

        // it('email field should be valid', function () {
        //     expect(view.$el.find('.form-group.email')).not.toHaveClass('error');
        // });
        //
        // it('password field should be invalidated', function () {
        //     expect(view.$el.find('.form-group.password')).toHaveClass('error');
        // });

      });

      describe('email and feedback filled', function () {

        beforeEach(function () {
          spyOn(view.model, 'save').andCallThrough();
        });

        beforeEach(function () {
          view.$el.find('[name="email"]').val('a@a.com').trigger('change');
          view.$el.find('[name="password"]').val('testtest').trigger('change');
        });

        beforeEach(function () {
          view.$el.find('#loginSubmit').trigger('click');
        });

        // it('should show no errors', function () {
        //     expect(view.$el.find('.error').length).toBe(0);
        // });

        // it('should save model', function () {
        //     expect(view.model.save).toHaveBeenCalled();
        // });

      });

    });

  });
});
