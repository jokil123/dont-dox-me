// Returns a list of illegal words if found in the node
// If none are found an empty list is returned
export const findIllegalNodeContent = (
  node: Node,
  illegals: string[]
): [number, number][] => {
  let pos: [number, number][] = [];

  let text = node.textContent ? node.textContent : "";

  illegals.forEach((illegal) => {
    let indicies = findAllOccurrences(text, illegal);

    indicies.forEach((index) => {
      pos.push([index, index + illegal.length]);
    });
  });

  return pos;
};

// Searches a text for an illegal word and returns its starting indices
export const findAllOccurrences = (text: string, match: string): number[] => {
  let occ: number[] = [];

  let startOffset = 0;
  while (true) {
    let pos = text
      .toLowerCase()
      .normalize()
      .indexOf(match.toLowerCase().normalize(), startOffset);

    if (pos == -1) {
      break;
    }

    occ.push(pos);
    startOffset = pos + match.length;
  }

  return occ;
};
