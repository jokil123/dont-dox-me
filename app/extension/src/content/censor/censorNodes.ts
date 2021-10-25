import { wrapWithSpans } from "../../util/textWrapper";
import { findIllegalNodeContent } from "./isIllegal";

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
