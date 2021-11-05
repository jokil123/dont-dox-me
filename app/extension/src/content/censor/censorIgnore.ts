export const ignore = {
  tags: ["SCRIPT", "STYLE"],
};

export const filterNodes = (nodes: Node[]): Node[] => {
  let filteredNodes = nodes.filter((node) => {
    return !ignore.tags.some((tag) => {
      return node.parentNode?.nodeName == tag;
    });
  });

  // console.log({ filtered: filteredNodes, unfiltered: nodes });

  return filteredNodes;
};
