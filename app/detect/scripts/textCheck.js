"use strict";
exports.__esModule = true;
exports.preProcessText = exports.illegalAliensPosition = exports.containsIllegalAlien = void 0;
var containsIllegalAlien = function (content, illegalAliens) {
    var contentArray = Array.from(content);
    contentArray.map(function (x) {
        return exports.preProcessText(x);
    });
    return contentArray.some(function (contentItem) {
        return illegalAliens.some(function (illegalAlien) {
            if (content.indexOf(illegalAlien) >= 0) {
                return true;
            }
        });
    });
};
exports.containsIllegalAlien = containsIllegalAlien;
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
exports.illegalAliensPosition = illegalAliensPosition;
var preProcessText = function (text) {
    var removableCharacters = /[\n .\t\r]+/g;
    return text.toLowerCase().replace(removableCharacters, "");
};
exports.preProcessText = preProcessText;
