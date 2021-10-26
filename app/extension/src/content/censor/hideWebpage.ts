export const hide = (element?: HTMLElement) => {
  element
    ? (element.style.visibility = "hidden")
    : (document.documentElement.style.visibility = "hidden");
};

export const show = (element?: HTMLElement) => {
  element
    ? (element.style.visibility = "")
    : (document.documentElement.style.visibility = "");
};
