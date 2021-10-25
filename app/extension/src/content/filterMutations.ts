export const filterTextMutations = (mutations: MutationRecord[]): Node[] => {
  let textNodes: Node[] = [];
  //let relevantMutations: MutationRecord[] = [];

  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeName == "#text") {
        textNodes.push(node);
        //relevantMutations.push(mutation);
      }
    });
  });
  return textNodes;
};
