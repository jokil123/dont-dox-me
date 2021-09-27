import { findIllegalAlienElements } from "./findIllegalElements";

let el = document.getElementById("test");
let illegalAliens = ["amogus", "suspicious", "sus"];
let ilel = findIllegalAlienElements(el, illegalAliens);
