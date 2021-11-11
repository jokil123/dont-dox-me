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
      tagConfig.attr.forEach((attr) => {
        illegals.forEach((illegal) => {
          let elAttr = element.getAttribute(attr);
          if (elAttr) {
            if (findAllOccurrences(elAttr, illegal).length != 0) {
              illegalElements.push(element);
            }
          }
        });
      });
    });
  });

  return illegalElements;
};

export const censorIllegalElements = (elements: Node[]) => {
  let spans: HTMLSpanElement[] = [];

  elements.forEach((element) => {
    spans.push(wrapElementWithSpan(element));
  });

  spans.forEach((span) => {
    span.className = "censor element";
  });
};
