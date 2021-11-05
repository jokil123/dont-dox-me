/* eslint-disable @typescript-eslint/no-explicit-any */
// Promise wrapper for chrome.tabs.sendMessage
export const sendMessagePromise = (message: any) => {
  return new Promise<any>((resolve) => {
    chrome.runtime.sendMessage(message, resolve);
  });
};
