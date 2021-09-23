let dirtySweep = (
  element: HTMLElement,
  illegalAliens: Array<string>
): boolean => {
  let elementText = element.innerText;
  elementText = elementText.toLowerCase();

  return illegalAliens.some((illegalAlien) => {
    if (elementText.indexOf(illegalAlien) >= 0) {
      return true;
    }
  });
};

let findIllegalAliens = (
  element: HTMLElement,
  illegalAliens: Array<string>
) => {};

let illegalAliens = ["amogus", "suspicious", "sus"];

let a = dirtySweep(document.body, illegalAliens);
