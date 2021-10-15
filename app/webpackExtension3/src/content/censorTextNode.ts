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

export const wrapWithSpans = (
  node: Node,
  wrapElements: [number, number][]
): HTMLSpanElement[] => {
  let spans: HTMLSpanElement[] = [];

  return spans;
};

export const mergeSelections = (
  selections: [number, number][]
) /*: [number, number][]*/ => {
  let activeSelections = 0;

  selections.sort((a, b) => {
    return a[0] - b[0];
  });

  let mergedSels: [number, number][] = [selections[0]];

  for (let i = 1; i < mergedSels.length; i++) {
    const sel = mergedSels[i];

    if (mergedSels.at(-1)?.[1]) {
    }
  }
};
