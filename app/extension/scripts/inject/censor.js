let censorText = (node, start, end) => {
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
let censorElement = (element) => {
    let censorSpan = document.createElement("span");
    censorSpan.appendChild(element.cloneNode(true));
    censorSpan.className = "censor element";
    element.parentElement.appendChild(censorSpan);
    element.remove();
};
let isTextNode = (node) => {
    if (node.nodeName == "#text") {
        return true;
    }
};
let init = () => {
    let el = document.getElementById("test");
    censorText(el.childNodes[0], 1, 5);
    censorElement(el);
};
