import { findIllegalAlienElements } from "./findIllegalElements.js";
import { censorElement } from "./censor.js";

let illegalAliens = ["amogus", "suspicious", "sus"];

let el = document.body;
let ilel = findIllegalAlienElements(el, illegalAliens);
console.log(ilel);

ilel.forEach((illegalAlien) => {
  censorElement(illegalAlien);
});
