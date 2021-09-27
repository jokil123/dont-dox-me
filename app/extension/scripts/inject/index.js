import { findIllegalAlienElements } from "./findIllegalElements.js";
let illegalAliens = ["amogus", "suspicious", "sus"];
let el = document.body;
let ilel = findIllegalAlienElements(el, illegalAliens);
console.log(ilel);
