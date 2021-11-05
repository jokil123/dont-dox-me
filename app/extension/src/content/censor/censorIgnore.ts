export const ignore = {
  tags: ["SCRIPT", "STYLE"],
};

// Filters text nodes which are inside a tag to ignore in this case the script and style tags
// example usage:
// [<script>, <p>] => [<p>]
export const filterNodes = (nodes: Node[]): Node[] => {
  let filteredNodes = nodes.filter((node) => {
    return !ignore.tags.some((tag) => {
      return node.parentNode?.nodeName == tag;
    });
  });

  // console.log({ filtered: filteredNodes, unfiltered: nodes });

  return filteredNodes;
};
