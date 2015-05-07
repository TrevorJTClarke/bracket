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