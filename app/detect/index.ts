let preProcessText = (text: string): string => {
  let removableCharacters = /[\n .\t\r]+/g;
  return text.toLowerCase().replace(removableCharacters, "");
};

let dirtySweep = (
  element: HTMLElement,
  illegalAliens: Array<string>
): boolean => {
  let elementText = element.innerText;

  return containsIllegalAlien(elementText, illegalAliens);
};

let containsIllegalAlien = (
  str: string,
  illegalAliens: Array<string>
): boolean => {
  str = preProcessText(str);

  return illegalAliens.some((illegalAlien) => {
    if (str.indexOf(illegalAlien) >= 0) {
      return true;
    }
  });
};

let inspectHtmlTag = (element: Element) => {
  console.log(element.tagName);
  console.log(element.textContent);
};

let findIllegalAliens = (
  element: Element,
  illegalAliens: Array<string>
): [HTMLElement, number, number] => {
  // This is the ineffective version
};

let htmlRecursive = (
  element: Element,
  iteratorFunction: (element: Element) => any,
  discriminatorFunction: (element: Element) => boolean
) => {
  iteratorFunction(element);

  Array.from(element.children).forEach((child) => {
    if (discriminatorFunction(child)) {
      htmlRecursive(child, iteratorFunction, discriminatorFunction);
    }
  });
};

let illegalAliens = ["amogus", "suspicious", "sus"];

let a = dirtySweep(document.body, illegalAliens);

htmlRecursive(document.body, inspectHtmlTag, (element: Element): boolean => {
  return containsIllegalAlien(element.textContent, illegalAliens);
});
