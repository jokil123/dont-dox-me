var dirtySweep = function (element, illegalAliens) {
    var elementText = element.innerText;
    elementText = elementText.toLowerCase();
    return illegalAliens.some(function (illegalAlien) {
        if (elementText.indexOf(illegalAlien) >= 0) {
            return true;
        }
    });
};
var findIllegalAliens = function (element, illegalAliens) { };
var illegalAliens = ["amogus", "suspicious", "sus"];
var a = dirtySweep(document.body, illegalAliens);
