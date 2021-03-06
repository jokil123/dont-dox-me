// returns a list of text nodes in a node recursively (the entire tree)
export const getTextNodesIn = (
  node: Node,
  includeWhitespaceNodes: boolean
): Node[] => {
  let textNodes: Node[] = [],
    whitespace = /^\s*$/;

  const getTextNodes = (node: Node) => {
    if (node.nodeType == 3) {
      if (
        includeWhitespaceNodes ||
        !whitespace.test(node.nodeValue ? node.nodeValue : "")
      ) {
        textNodes.push(node);
      }
    } else {
      for (let i = 0, len = node.childNodes.length; i < len; ++i) {
        getTextNodes(node.childNodes[i]);
      }
    }
  };

  getTextNodes(node);
  return textNodes;
};
