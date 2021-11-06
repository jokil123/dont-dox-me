import { findAllOccurrences } from "./isIllegal";

export type tagCensorConfigShape = {
  tag: string[];
  attr: string[];
}[];

export const tagCensorConfig: tagCensorConfigShape = [
  {
    tag: ["img"],
    attr: ["src", "alt"],
  },
];

export const wrapElementWithSpan = (element: Element): HTMLSpanElement => {
  let span = document.createElement("span");

  element.parentElement && element.parentElement.replaceChild(element, span);

  span.appendChild(element);

  return span;
};

export const findIllegalElements = (
  base: HTMLElement,
  config: tagCensorConfigShape,
  illegals: string[]
): Element[] => {
  let tagConfigs: { tag: string[]; attr: string[]; elements?: Element[] }[] = [
    ...config,
  ];

  tagConfigs.forEach((tagConfig) => {
    tagConfig.elements = [];

    tagConfig.tag.forEach((tag) => {
      tagConfig.elements?.concat(Array.from(base.getElementsByTagName(tag)));
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
