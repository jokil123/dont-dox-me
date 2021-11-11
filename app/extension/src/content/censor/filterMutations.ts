// returns a list of nodes that have mutated and need to be censored
export const filterTextMutations = (mutations: MutationRecord[]): Node[] => {
  let filteredNodes: Node[] = [];

  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      filteredNodes.push(node);
    });
  });

  return filteredNodes;
};

export const filterElementMutations = (mutations: MutationRecord[]): Node[] => {
  let filteredElements: Node[] = [];

  mutations.forEach((mutation) => {
    if (mutation.target) {
      filteredElements.push(mutation.target);
    }

    mutation.addedNodes.forEach((node) => {
      filteredElements.push(node);
    });
  });

  return filteredElements;
};
