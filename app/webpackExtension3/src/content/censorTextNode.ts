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
