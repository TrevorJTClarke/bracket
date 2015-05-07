/* bracket actions */
// toggles class, sister element, and pushes into the next round
function toggleBracketElem ( el ){
    var elData = el.id.split("-");
        elData.shift();
    var sisId = getSisterId( el, elData );
    var sisEl = d.getElementById( sisId );

    addClass( el, "active");
    removeClass( sisEl, "active");

    // push into next round
    pushToNextRound( el, elData );
}

// returns an element ID to grab and toggle
// NOTE: [round][position][itemNum]
function getSisterId ( el, data ) {
    data.map(function(obj, idx){
        data[idx] = parseInt(obj,10);
    });
    var elemIdx = getElementIndex( el );
    var linIdx = Math.floor(elemIdx / 2);
    var posNum = (data[1] === 0)? 1:0;
    var linUpNum = rounds[ data[0] - 1 ][linIdx][posNum];
    var sisNum = linUpNum;
    return "round-" + data[0] + "-" + posNum + "-" + sisNum;
}

// adds the element to the next round array, binds listener
function pushToNextRound ( el, data ){
    // get id, add new round
    var newRound = data[0] + 1;
    
    // identify the next round index
    var elsTotal = el.parentNode.childNodes.length;
    var elemIdx = getElementIndex( el );
    var linIdx = Math.floor(elemIdx / 2);
    var posIdx = Math.floor(linIdx / 2);
    var incIdx = Math.floor(elsTotal / posIdx);
    var newRoundId = "round-" + newRound + "-" + posIdx + "-" + posIdx;
    
    // create new element
    var section = d.getElementById( newRoundId );
    var sectionElems = section.parentNode.childNodes;
    var changeElem;

    for (var i = 0; i < sectionElems.length; i++) {
        if(i === linIdx){
            changeElem = sectionElems[i];
        }
    }

    // append in correct spot
    pushElementChange( changeElem, el );
}

function pushElementChange ( container, el ){
    var clone = el.cloneNode(true);
    container.className = clone.className;
    container.innerHTML = "";
    container.appendChild( clone.childNodes[0] );
}