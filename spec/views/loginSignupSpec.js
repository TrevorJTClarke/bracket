define(['views/loginSignup', 'models/authUser', 'backbone.validation', 'routers/state', 'jasminequery', 'models/validator'], function(LSV, authUser, Validation) {
  var view, model;

  describe("Login/Signup View", function() {

    beforeEach(function () {
      view = new LSV({ model: new authUser() });
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

        it('validation method should return false', function () {
          var isValid = view.model.isValid();
          expect( isValid ).toBeFalsy();
        });

        it('email field should be invalidated', function () {
          expect( view.$el.find('.form-group.email')[0] ).toHaveClass('error');
        });

        it('password field should be invalidated', function () {
            expect( view.$el.find('.form-group.password') ).toHaveClass('error');
        });

      });

      describe('only email field filled', function () {

        beforeEach(function () {
          view.$el.find('[name="email"]').val('a@a.com').trigger('change');
          view.$el.find('[name="password"]').val('').trigger('change');
        });

        beforeEach(function () {
          view.$el.find('#loginSubmit').trigger('click');
        });

        it('email field should be valid', function () {
            expect(view.$el.find('.form-group.email')).not.toHaveClass('error');
        });

        it('password field should be invalidated', function () {
            expect(view.$el.find('.form-group.password')).toHaveClass('error');
        });

      });

      describe('email and password filled', function () {

        beforeEach(function () {
          view.$el.find('[name="email"]').val('a@a.com').trigger('change');
          view.$el.find('[name="password"]').val('testtest').trigger('change');
        });

        beforeEach(function () {
          view.$el.find('#loginSubmit').trigger('click');
        });

        it('should show no errors', function () {
            expect(view.$el.find('.error').length).toBe(0);
        });

      });

    });

    describe('when signup form is submitted', function () {

      describe('no inputs are filled', function () {

        beforeEach(function () {
          view.$el.find('.form-group.emailSignup').val('').trigger('change');
          view.$el.find('.form-group.passwordSignup').val('').trigger('change');
        });

        beforeEach(function () {
          view.$el.find('#signupSubmit').trigger('click');
        });

        it('validation method should return false', function () {
          var isValid = view.model.isValid();
          expect( isValid ).toBeFalsy();
        });

        it('email field should be invalidated', function () {
          expect( view.$el.find('.form-group.emailSignup') ).toHaveClass('error');
        });

        it('password field should be invalidated', function () {
          expect( view.$el.find('.form-group.passwordSignup') ).toHaveClass('error');
        });

      });

      describe('only email field filled', function () {

        beforeEach(function () {
          view.$el.find('.form-group.emailSignup input').val('a@a.com').trigger('change');
          view.$el.find('.form-group.passwordSignup input').val('').trigger('change');
        });

        beforeEach(function () {
          view.$el.find('#signupSubmit').trigger('click');
        });

        it('email field should be valid', function () {
            expect( view.$el.find('.form-group.emailSignup') ).not.toHaveClass('error');
        });

        it('password field should be invalidated', function () {
            expect( view.$el.find('.form-group.passwordSignup') ).toHaveClass('error');
        });

      });

      describe('all fields filled', function () {

        beforeEach(function () {
          view.$el.find('.form-group.emailSignup input').val('a@a.com').trigger('change');
          view.$el.find('.form-group.passwordSignup input').val('testtest').trigger('change');
          view.$el.find('.form-group.firstName input').val('First').trigger('change');
          view.$el.find('.form-group.lastName input').val('Last').trigger('change');
          view.$el.find('.form-group.color input').val('#333333').trigger('change');
        });

        beforeEach(function () {
          view.$el.find('#signupSubmit').trigger('click');
        });

        it('should show no errors', function () {
            expect(view.$el.find('.error').length).toBe(0);
        });

      });

    });

  });
});
