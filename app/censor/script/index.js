var censorText = function (node, start, end) {
    if (isTextNode) {
        node.before(document.createTextNode(node.textContent.substring(0, start)));
        node.after(document.createTextNode(node.textContent.substring(end)));
        var censorSpan = document.createElement("span");
        censorSpan.className = "censor text";
        censorSpan.textContent = node.textContent.substring(start, end);
        node.replaceWith(censorSpan);
    }
    else {
        throw TypeError;
    }
};
var censorElement = function (element) {
    var censorSpan = document.createElement("span");
    censorSpan.appendChild(element.cloneNode(true));
    censorSpan.className = "censor element";
    element.parentElement.appendChild(censorSpan);
    element.remove();
};
var isTextNode = function (node) {
    if (node.nodeName == "#text") {
        return true;
    }
};
var init = function () {
    var el = document.getElementById("test");
    censorText(el.childNodes[0], 1, 5);
    censorElement(el);
};
