import { containsIllegalAlien } from "./textCheck.js";

export const findIllegalAlienElements = (
  element: Element,
  illegalAliens: string[]
): Element[] => {
  let illegalAlienElements: Element[] = [];

  const iteratorFunction = (element: Element) => {
    if (IsElementSus(element, illegalAliens)) {
      illegalAlienElements.push(element);
    }
  };

  const discriminatorFunction = (element: Element): boolean => {
    return (
      containsIllegalAlien([element.innerHTML], illegalAliens) ||
      IsElementSus(element, illegalAliens)
    );
  };

  ElementRecursive(element, iteratorFunction, discriminatorFunction);

  return illegalAlienElements;
};

const IsElementSus = (element: Element, illegalAliens: string[]): boolean => {
  return Array.from(element.attributes).some((attribute) => {
    return containsIllegalAlien(
      [attribute.name, attribute.value, attribute.nodeName],
      illegalAliens
    );
  });
};

const ElementRecursive = (
  element: Element,
  iteratorFunction: (element: Element) => void,
  discriminatorFunction: (element: Element) => boolean
) => {
  iteratorFunction(element);

  Array.from(element.children).forEach((child) => {
    if (discriminatorFunction(child)) {
      ElementRecursive(child, iteratorFunction, discriminatorFunction);
    }
  });
};
