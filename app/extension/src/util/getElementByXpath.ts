// selects an element by X-path (might not be required anymore)
export const getElementByXpath = (path: string) => {
  return document.evaluate(
    path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
};
