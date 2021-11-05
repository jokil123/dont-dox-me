export const filterTextMutations = (mutations: MutationRecord[]): Node[] => {
  let filteredNodes: Node[] = [];
  //let relevantMutations: MutationRecord[] = [];

  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      filteredNodes.push(node);
      //relevantMutations.push(mutation);
    });
  });
  return filteredNodes;
};
