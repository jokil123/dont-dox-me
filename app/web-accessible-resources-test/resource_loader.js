"use strict";

console.log("attempting to insert element");

const el = document.createElement("img");
el.setAttribute("src", chrome.runtime.getURL("img.png"));
const head =
  document.head ||
  document.getElementsByTagName("head")[0] ||
  document.documentElement;

console.log(el);
head.insertBefore(el, head.lastChild);
