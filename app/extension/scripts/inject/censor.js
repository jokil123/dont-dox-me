export const censorText = (node, start, end) => {
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
export const censorElement = (el) => {
    let censorSpan = document.createElement("span");
    el.parentElement.insertBefore(censorSpan, el);
    censorSpan.className = "censor el";
    el.remove();
    censorSpan.appendChild(el);
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
