// hides the entire webpage or a specific element
export const hide = (element?: HTMLElement) => {
  element
    ? (element.style.visibility = "hidden")
    : (document.documentElement.style.visibility = "hidden");
};

// shows the entire webpage or a specific element
export const show = (element?: HTMLElement) => {
  element
    ? (element.style.visibility = "")
    : (document.documentElement.style.visibility = "");
};
