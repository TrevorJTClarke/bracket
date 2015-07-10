/**
 * Mutates the tier data into usable sets of tiers and spacers
 * @return {String} returns the template with appropriate data
 *
 * USE:
 * {{#tiersFlow this}}
 * {{/tiersFlow}}
 */
Handlebars.registerHelper('tiersFlow', function(context, options) {
  if (!context || context.tierCount < 1) { return; }

  var tiers = [];
  var tierNamespace = 'tier_';

  for (var i = 0; i < context.tierCount; i++) {
    var k = i + 1;
    var tierData = context[tierNamespace + k];
    var spacers = [];

    if (k !== context.tierCount) {
      spacers.length = Math.round(tierData.length / 2);
    } else {
      spacers = null;
    }

    tiers.push({
      matches: tierData,
      spacers: spacers
    });
  }

  // TODO: setup future tiers if we should have more!

  return options.fn(tiers);
});
