import { mergeSelection, wrapWithSpan } from "./censorTextNode";
import { getTextNodesIn } from "./getTextNodes";
import { isIllegalNode } from "./isIllegal";

console.log('Content Script: "Hello World"');

let illegals = ["sus", "among"];

let nodes = getTextNodesIn(document.body, true);

nodes.forEach((node) => {
  let out = isIllegalNode(node, illegals);
  if (out.illegal) {
    out.pos.forEach((p) => {
      wrapWithSpan(node, p[0], p[1]);
    });
  }
});

mergeSelection([
  [2, 4],
  [1, 3],
]);
