let readyToSend = new Promise((resolve) => {
  console.log("stuff");
  chrome.runtime.sendMessage("isReadyToSend", () => {
    console.log(chrome.runtime.lastError);

    if (chrome.runtime.lastError) {
      chrome.runtime.onMessage.addListener((message) => {
        if (message == "readyToSend") {
          console.log("now readyToSend");
          resolve(true);
        }
      });
    } else {
      console.log("already readyToSend");
      resolve(true);
    }
  });
});

/* eslint-disable @typescript-eslint/no-explicit-any */
// Promise wrapper for chrome.tabs.sendMessage
export const sendMessagePromise = async (message: any) => {
  await readyToSend;
  return new Promise<any>((resolve) => {
    chrome.runtime.sendMessage(message, resolve);
  });
};
