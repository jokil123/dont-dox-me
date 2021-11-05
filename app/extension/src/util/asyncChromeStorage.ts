/* eslint-disable @typescript-eslint/no-explicit-any */
// Promise wrapper for chrome.storage.sync.get
export const set = (item: { [key: string]: any }) => {
  return new Promise<void>((resolve, reject) => {
    try {
      chrome.storage.sync.set(item, resolve);
    } catch (e) {
      reject(e);
    }
  });
};

// Promise wrapper for chrome.storage.sync.get
export const get = (
  keys?: string | string[] | { [key: string]: any } | null | undefined[]
) => {
  return new Promise<{ [key: string]: any }>((resolve) => {
    if (keys) {
      chrome.storage.sync.get(keys, resolve);
    } else {
      chrome.storage.sync.get(resolve);
    }
  });
};

// Promise wrapper for chrome.storage.sync.remove
export const remove = (keys: string | string[]) => {
  return new Promise<void>((resolve) => {
    chrome.storage.sync.remove(keys, resolve);
  });
};

// Promise wrapper for chrome.storage.sync.clear
export const clear = () => {
  return new Promise<void>((resolve) => {
    chrome.storage.sync.clear(resolve);
  });
};
