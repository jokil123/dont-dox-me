/* eslint-disable @typescript-eslint/no-explicit-any */
export const sendMessagePromise = (message: any) => {
  return new Promise<any>((resolve) => {
    chrome.runtime.sendMessage(message, (response) => {
      resolve(response);
    });
  });
};
