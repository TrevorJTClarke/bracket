Handlebars.registerHelper('initialz', function(user) {
  return (user.firstName.charAt(0) + user.lastName.charAt(0)).toUpperCase();
});
