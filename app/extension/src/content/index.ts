import "./censorStyle.scss";

import { wrapWithSpans } from "./censorTextNode";
import { getTextNodesIn } from "./getTextNodes";
import { findIllegalNodeContent } from "./isIllegal";

console.log('Content Script: "Hello World"');

let illegals = [
  "sus",
  "among",
  "imposter",
  "impostor",
  "amogus",
  "among us",
  "amongus",
  "impostors",
  "imposters",
];

let nodes = getTextNodesIn(document.body, true);

nodes.forEach((node) => {
  let pos = findIllegalNodeContent(node, illegals);
  if (pos.length != 0) {
    let spans = wrapWithSpans(node, pos);

    spans.forEach((span) => {
      span.className = "censor text";
    });
  }
});