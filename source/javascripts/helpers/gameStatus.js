Handlebars.registerHelper('gameStatus', function(match) {
  var typeName = 'default';

  // TODO: check if there is a finalist, and if so, check to see if its me
  switch (match.status){
    case 'pending':
      typeName = 'warning';
      break;
    case 'active':
      typeName = 'success';
      break;
    case 'finished':
      typeName = 'info';
      break;
  }
  return typeName;
});
