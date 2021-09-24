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
var inspectHtmlTag = function (element) {
    console.log(element.tagName);
    console.log(element.textContent);
};
var findIllegalAliens = function (element, illegalAliens) {
    // This is the ineffective version
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
htmlRecursive(document.body, inspectHtmlTag, function (element) {
    return containsIllegalAlien(element.textContent, illegalAliens);
});
