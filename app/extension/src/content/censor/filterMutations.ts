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

export const filterElementMutations = (
  mutations: MutationRecord[]
): Element[] => {
  let filteredElements: Element[] = [];

  mutations.forEach((mutation) => {
    if (mutation.target) {
      if (mutation.target instanceof Element) {
        filteredElements.push(mutation.target);
      }
    }

    mutation.addedNodes.forEach((node) => {
      if (node instanceof Element) {
        filteredElements.push(node);
      }
    });
  });

  return filteredElements;
};
