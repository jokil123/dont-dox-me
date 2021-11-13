export const connectListener = () => {
  chrome.runtime.onConnect.addListener((port) => {
    console.log(`Connected to ${port}`);
  });
};

/* eslint-disable @typescript-eslint/no-explicit-any */
// Promise wrapper for chrome.tabs.sendMessage
export const sendMessagePromise = (message: any) => {
  return new Promise<any>((resolve) => {
    chrome.runtime.sendMessage(message, resolve);
  });
};
