(function(w,d,undefined){
/* Bracket Data */
var competitors = [{
    num: 1,
    title: "Saleen GTX"
},{
    num: 2,
    title: "Ferrari Scuderia"
},{
    num: 3,
    title: "2014 Porsche GT2"
},{
    num: 4,
    title: "2013 C36 AMG"
},{
    num: 5,
    title: "2013 Bugatti Vitesse"
},{
    num: 6,
    title: "2000 Cobra R"
},{
    num: 7,
    title: "2007 Lamborghini LP640"
},{
    num: 8,
    title: "2004 Porsche GT3"
}];

var rounds = [
    [[1,8],[4,5],[3,6],[2,7]],
    [[0,0],[0,0]],
    [[0,0]],
    [[0]]
];
/* events */
var addEvent = (function() {
    if (document.addEventListener) {
        return function(el, type, fn) {
            if (el && el.nodeName || el === window) {
                el.addEventListener(type, fn, true);
            } else if (el && el.length) {
                for (var i = 0; i < el.length; i++) {
                    addEvent(el[i], type, fn);
                }
            }
        };
    } else {
        return function(el, type, fn) {
            if (el && el.nodeName || el === window) {
                el.attachEvent('on' + type, function() {
                    return fn.call(el, window.event);
                });
            } else if (el && el.length) {
                for (var i = 0; i < el.length; i++) {
                    addEvent(el[i], type, fn);
                }
            }
        };
    }
})();
/* Helpers */
function createElem (type, id, cl, content) {
    var newElem = d.createElement( type );
        if(id){ newElem.id = id; }
        if(cl){ newElem.className = cl; }
        if(content){ newElem.textContent = content; }

    return newElem;
}

function getElementIndex ( el ) {
    var container = el.parentNode;
    return Array.prototype.indexOf.call(container.childNodes, el);
}

function toggleClass ( el, className ) {
    if(!el.classList){return;}
    el.classList.toggle( className );
}
function hasClass( el, cls ) {
    return !!el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
function addClass( el, cls ) {
    if (!hasClass(el,cls)) el.className += " " + cls;
}
function removeClass( el, cls ) {
    if (hasClass(el,cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        el.className = el.className.replace(reg,' ');
    }
}
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
})(window,document);