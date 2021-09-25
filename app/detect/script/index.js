var preProcessText = function (text) {
    var removableCharacters = /[\n .\t\r]+/g;
    return text.toLowerCase().replace(removableCharacters, "");
};
var dirtySweep = function (element, illegalAliens) {
    var elementText = element.innerText;
    return containsIllegalAlien(elementText, illegalAliens);
};
var containsIllegalAlien = function (str, illegalAliens) {
    str = preProcessText(str);
    return illegalAliens.some(function (illegalAlien) {
        if (str.indexOf(illegalAlien) >= 0) {
            return true;
        }
    });
};
var illegalAliensPosition = function (element, illegalAliens) {
    var alienPositions = [];
    illegalAliens.forEach(function (illegalAlien) {
        var startIndex = element.textContent.indexOf(illegalAlien);
        if (startIndex >= 0) {
            alienPositions.push([startIndex, startIndex + illegalAlien.length]);
        }
    });
    return alienPositions;
};
var inspectHtmlTag = function (element) {
    console.log(element.tagName);
    console.log(element.textContent);
};
var findIllegalAliens = function (element, illegalAliens) {
    var illegalAlienElements = [];
    var iteratorFunction = function (element) {
        illegalAliensPosition(element, illegalAliens);
    };
    htmlRecursive(element);
    return illegalAlienElements;
};
var htmlRecursive = function (element, iteratorFunction, discriminatorFunction) {
    iteratorFunction(element);
    Array.from(element.children).forEach(function (child) {
        if (discriminatorFunction(child)) {
            htmlRecursive(child, iteratorFunction, discriminatorFunction);
        }
    });
};
var illegalAliens = ["amogus", "suspicious", "sus"];
var a = dirtySweep(document.body, illegalAliens);
htmlRecursive(document.body, inspectHtmlTag);
;
