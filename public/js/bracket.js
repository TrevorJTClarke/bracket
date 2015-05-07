/* Bracket logic */
// TODO:
// - set item into next round
// - if has childNode remove
var uid = 0;
function createBracketDefault ( id, pos, container ) {
    var brItem = createElem("li", id + '-' + pos + '-' + uid, "gfull");
    var defaultItem = createElem("div", null, "bracket-item default");
    uid++;
    brItem.appendChild(defaultItem);
    container.appendChild(brItem);
}

function createBracketMeta ( data, container ) {
    var bracketItem = createElem("div", null, "bracket-item");
    var numItem = createElem("i", null, "number", data.num);
    var titleItem = createElem("h3", null, "title", data.title);

    bracketItem.appendChild(numItem);
    bracketItem.appendChild(titleItem);
    container.appendChild(bracketItem);
}

function createBracketItem ( round, pos, data, container ) {
    round = round || "round-1";
    // NOTE: element ID tracking: Round-Position-DataNum
    var brItem = createElem("li", round + '-' + pos + '-' + data.num, "gfull");

    // add meta data
    createBracketMeta( data, brItem );

    var newBrItem = container.appendChild(brItem);
    bindItem( newBrItem );
}

// bind the element to a click event
function bindItem ( el ) {
    addEvent(el, 'click', function(e) {
        e.preventDefault();
        var thisEl = e.target.parentNode.parentNode;
        
        toggleBracketElem( thisEl );
    });
}

// sets up data and element for creating a single bracket item
function createIndividual ( id, pos, data, container ) {
    var individualData = competitors[data - 1];

    createBracketItem( id, pos, individualData, container);
}

// sets up data and element for creating a line up
function createLineUp ( id, data, container ) {
    // create each bracket item, put into the correct round by ID
    for (var i = 0; i < data.length; i++) {
        var lineData = data[i];

        if(lineData === 0){
            createBracketDefault( id, i, container );
        } else {
            createIndividual( id, i, lineData, container );
        }
    }
}

// sets up data and element for creating a round
function createRound ( id, container ) {
    var roundNum = parseInt(id.split("-")[1],10);
    var roundData = rounds[roundNum - 1];
    uid = 0;
    if(!roundData){return;}

    for (var i = 0; i < roundData.length; i++) {
        var lineUpData = roundData[i];

        createLineUp( id, lineUpData, container);
    }
}

var allRounds = d.querySelectorAll("aside");

// Start the setup, and bind all actions
for (var i = 0; i < allRounds.length; i++) {
    var roundItem = allRounds[i];
    var newUl = d.createElement("ul");
    var roundContainer = roundItem.appendChild( newUl );
    
    createRound( roundItem.id, roundContainer );
}