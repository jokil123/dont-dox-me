"use strict";
exports.__esModule = true;
exports.findIllegalAlienElements = void 0;
var textCheck_1 = require("./textCheck");
var findIllegalAlienElements = function (element, illegalAliens) {
    var illegalAlienElements = [];
    var iteratorFunction = function (element) {
        if (IsElementSus(element, illegalAliens)) {
            illegalAlienElements.push(element);
        }
    };
    var discriminatorFunction = function (element) {
        return textCheck_1.containsIllegalAlien(element.textContent, illegalAliens);
    };
    ElementRecursive(element, iteratorFunction, discriminatorFunction);
    return illegalAlienElements;
};
exports.findIllegalAlienElements = findIllegalAlienElements;
var IsElementSus = function (element, illegalAliens) {
    return Array.from(element.attributes).some(function (attribute) {
        return textCheck_1.containsIllegalAlien([attribute.name, attribute.value, attribute.nodeName], illegalAliens);
    });
};
var ElementRecursive = function (element, iteratorFunction, discriminatorFunction) {
    iteratorFunction(element);
    Array.from(element.children).forEach(function (child) {
        if (discriminatorFunction(child)) {
            ElementRecursive(child, iteratorFunction, discriminatorFunction);
        }
    });
};
