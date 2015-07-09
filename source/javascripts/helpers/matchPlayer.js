/**
 * grabs the player data from the main array so that the DB wont have to store as much data
 * @return {String} returns the template with appropriate data
 *
 * USE:
 * {{#matchPlayer players}}
 * 	<div>{{firstName}}</div>
 * {{/matchPlayer}}
 */
Handlebars.registerHelper('matchPlayer', function(context, options) {
  if (!context) { return; }

  var playerData = window.__ap || [];
  var a = context[0];
  var b = context[1];

  playerData.map(function(obj, idx) {
    if (obj.objectId === a) {
      context[0] = obj;
    }

    if (obj.objectId === b) {
      context[1] = obj;
    }
  });

  return context.map(function(item) {
    return '<div class="match-player">' + options.fn(item) + '</div>';
  }).join('\n');
});
