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
  var tierLanes = [];
  var tierLaneSort = 0;
  var tierNamespace = 'tier_';

  // check total tierCount and generate future tiers if no data is found
  if (context[tierNamespace + '1'] !== undefined) {
    var totalMatches = context[tierNamespace + '1'].length;
    var tmpMatchTotal = totalMatches;
    tierLanes[0] = totalMatches;

    function calcTotals() {
      if (Math.floor(tmpMatchTotal / 2) % 2 === 0) {
        tmpMatchTotal = Math.floor(tmpMatchTotal / 2);
        tierLanes.push(tmpMatchTotal);
        calcTotals();
      } else {
        tierLanes.push(1);
      }
    }

    calcTotals();
  }

  // loop through tiers, and setup data for view
  for (var i = 0; i < tierLanes.length; i++) {
    var k = i + 1;
    var spacers = [];
    var tierData = [];

    tierLaneSort += tierLanes[i];

    // check if next tier exists, else setup future games
    if (context[tierNamespace + k]) {
      tierData = context[tierNamespace + k];
      tierData.forEach(function(obj, idx) {
        tierData[idx].index = idx;
        tierData[idx].parentTier = k;
      });
    } else {
      for (var p = 0; p < tierLanes[i]; p++) {
        tierData.push({
          index: p,
          players: [{}, {}],
          winner: null,
          status: 'pending',
          sort: p + tierLaneSort,
          parentTier: k || 0
        });
      }
    }

    // setup needed spacers, if there is a future tier
    if (tierLanes[k]) {
      spacers.length = Math.round(tierLanes[i] / 2);
    } else {
      spacers = null;
    }

    // assemble data
    tiers.push({
      matches: tierData,
      spacers: spacers
    });
  }

  return options.fn(tiers);
});
