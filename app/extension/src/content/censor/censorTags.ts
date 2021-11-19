import { findAllOccurrences } from "./isIllegal";

export type tagCensorConfigShape = {
  tag: string[];
  attr: string[];
}[];

export const tagCensorConfig: tagCensorConfigShape = [
  {
    tag: ["img"],
    attr: ["alt"],
  },
];

// wraps an element in a span and returns the span
export const wrapElementWithSpan = (element: Node): HTMLSpanElement => {
  let span = document.createElement("span");

  element.parentNode && element.parentNode.replaceChild(span, element);

  span.appendChild(element);

  return span;
};

export const findIllegalElements = (
  base: Element,
  illegals: string[]
): Element[] => {
  let tagConfigs: { tag: string[]; attr: string[]; elements?: Element[] }[] = [
    ...tagCensorConfig,
  ];

  tagConfigs.forEach((tagConfig) => {
    tagConfig.elements = [];

    tagConfig.tag.forEach((tag) => {
      tagConfig.elements = tagConfig.elements?.concat(
        Array.from(base.getElementsByTagName(tag))
      );
    });
  });

  let illegalElements: Element[] = [];

  tagConfigs.forEach((tagConfig) => {
    tagConfig.elements?.forEach((element) => {
      if (isIllegalElement(element, illegals)) {
        illegalElements.push(element);
      }
    });
  });

  return illegalElements;
};

export const isIllegalElement = (
  element: Element,
  illegals: string[]
): boolean => {
  return tagCensorConfig.some((tagConfig) => {
    return tagConfig.attr.some((attr) => {
      return illegals.some((illegal) => {
        let elAttr = element.getAttribute(attr);

        if (elAttr) {
          if (findAllOccurrences(elAttr, illegal).length != 0) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      });
    });
  });
};

export const filterIllegalElements = (
  elements: Element[],
  illegals: string[]
): Element[] => {
  return elements.filter((element) => {
    return isIllegalElement(element, illegals);
  });
};

export const censorIllegalElements = (elements: Element[]) => {
  let spans: HTMLSpanElement[] = [];

  elements.forEach((element) => {
    spans.push(wrapElementWithSpan(element));
  });

  spans.forEach((span) => {
    span.className = "censor element";
  });
};
