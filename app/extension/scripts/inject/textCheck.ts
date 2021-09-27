export const containsIllegalAlien = (
  content: string | string[],
  illegalAliens: string[]
): boolean => {
  let contentArray = Array.from(content);

  contentArray = contentArray.map((x) => {
    return preProcessText(x);
  });

  return contentArray.some((contentItem) => {
    return illegalAliens.some((illegalAlien) => {
      if (contentItem.indexOf(illegalAlien) >= 0) {
        return true;
      }
    });
  });
};

export const illegalAliensPosition = (
  element: HTMLElement,
  illegalAliens: string[]
): [Number, Number][] => {
  let alienPositions: [Number, Number][] = [];

  illegalAliens.forEach((illegalAlien) => {
    let startIndex = element.textContent.indexOf(illegalAlien);
    if (startIndex >= 0) {
      alienPositions.push([startIndex, startIndex + illegalAlien.length]);
    }
  });

  return alienPositions;
};

export const preProcessText = (text: string): string => {
  let removableCharacters = /[\n .\t\r]+/g;
  return text.toLowerCase().replace(removableCharacters, "");
};
