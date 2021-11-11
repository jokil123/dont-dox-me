import { wrapWithSpans } from "../../util/textWrapper";
import { findIllegalNodeContent } from "./isIllegal";

// This will search illegals inside a list of nodes and censors them
// only nodes with illegal content are censored
export const censorNodes = (nodes: Node[], illegals: string[]) => {
  nodes.forEach((node) => {
    let pos = findIllegalNodeContent(node, illegals);
    if (pos.length != 0) {
      if (!node.parentElement?.matches(".censor.span")) {
        let wrapperSpan = document.createElement("span");

        if (node.parentNode) {
          if (!node.parentElement?.matches(".censor.wrapper")) {
            node.parentNode.replaceChild(wrapperSpan, node);
            wrapperSpan.appendChild(node);
            wrapperSpan.className = "censor wrapper";
          }
        }

        let spans = wrapWithSpans(node, pos);

        spans.forEach((span) => {
          span.className = "censor text";
        });
      }
    }
  });
};
