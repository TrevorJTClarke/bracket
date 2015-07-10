Handlebars.registerHelper('gameType', function(match) {
  return (typeof match.active !== undefined && match.active === true) ? true : false;
});
