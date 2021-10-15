// wraps a span around a substring in a text node and returns it
export const wrapWithSpan = (
  node: Node,
  start: number,
  end: number
): HTMLSpanElement => {
  let nodeText = node.textContent ? node.textContent : "";

  let beforeText = nodeText.substring(0, start);
  let middleText = nodeText.substring(start, end);
  let afterText = nodeText.substring(end);

  let span = document.createElement("span");
  span.innerHTML = middleText;

  let nodeParent = node.parentElement;

  if (nodeParent) {
    nodeParent.replaceChild(span, node);
    span.before(document.createTextNode(beforeText));
    span.after(document.createTextNode(afterText));
  }
  return span;
};

// wraps spans around a collection of substrings and returns them
export const wrapWithSpans = (
  node: Node,
  wrapElements: [number, number][]
): HTMLSpanElement[] => {
  let spans: HTMLSpanElement[] = [];

  let sels = mergeSelections(wrapElements).reverse();
  sels.forEach((sel) => {
    let span = wrapWithSpan(node, sel[0], sel[1]);
    spans.push(span);

    if (span.previousSibling) {
      node = span.previousSibling;
    } else {
      throw ReferenceError;
    }
  });

  return spans;
};

// takes a list of segments and merges overlapping ones
// in [[0, 5][3, 10]] => [[0, 10]]
export const mergeSelections = (
  selections: [number, number][]
): [number, number][] => {
  if (selections.length <= 1) {
    return selections;
  }

  selections = selections.map((sel) => {
    return sel[0] < sel[1] ? sel : [sel[1], sel[0]];
  });

  selections.sort((a, b) => {
    return a[0] - b[0];
  });

  let mergedSels: [number, number][] = [selections[0]];

  for (let i = 0; i < selections.length; i++) {
    let lastSel = mergedSels.at(-1);

    if (lastSel) {
      const sel = selections[i];
      if (sel[0] < lastSel[1]) {
        if (sel[1] > lastSel[1]) {
          lastSel[1] = sel[1];
        }
      } else {
        mergedSels.push(sel);
      }
    }
  }

  return mergedSels;
};
