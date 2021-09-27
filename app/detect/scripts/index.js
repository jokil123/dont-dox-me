"use strict";
exports.__esModule = true;
var findIllegalElements_1 = require("./findIllegalElements");
var el = document.getElementById("test");
var illegalAliens = ["amogus", "suspicious", "sus"];
var ilel = findIllegalElements_1.findIllegalAlienElements(el, illegalAliens);
