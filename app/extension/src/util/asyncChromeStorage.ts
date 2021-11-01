export const set = (item: { [key: string]: any }) => {
  return new Promise<void>((resolve, reject) => {
    try {
      chrome.storage.sync.set(item, resolve);
    } catch (e) {
      reject(e);
    }
  });
};

export const get = (
  keys?: string | string[] | { [key: string]: any } | null | undefined[]
) => {
  return new Promise<{ [key: string]: any }>((resolve, reject) => {
    if (keys) {
      chrome.storage.sync.get(keys, resolve);
    } else {
      chrome.storage.sync.get(resolve);
    }
  });
};

export const remove = (keys: string | string[]) => {
  return new Promise<void>((resolve, reject) => {
    chrome.storage.sync.remove(keys, resolve);
  });
};

export const clear = () => {
  return new Promise<void>((resolve, reject) => {
    chrome.storage.sync.clear(resolve);
  });
};
