import { wrapWithSpans } from "../../util/textWrapper";
import { findIllegalNodeContent } from "./isIllegal";

// This will search illegals inside a list of nodes and censors them
// only nodes with illegal content are censored
export const censorNodes = (nodes: Node[], illegals: string[]) => {
  nodes.forEach((node) => {
    let pos = findIllegalNodeContent(node, illegals);
    if (pos.length != 0) {
      let spans = wrapWithSpans(node, pos);

      spans.forEach((span) => {
        span.className = "censor text";
      });
    }
  });
};
