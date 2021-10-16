export const storage = {
  set: (item: { [key: string]: any }): Promise<void> => {
    let promise = new Promise<void>((resolve, reject) => {
      try {
        chrome.storage.sync.set(item, resolve);
      } catch {
        reject();
      }
    });

    return promise;
  },
  get: (
    keys?: string | string[] | { [key: string]: any } | null | undefined[]
  ): Promise<{ [key: string]: any }> => {
    let promise = new Promise<{ [key: string]: any }>((resolve, reject) => {
      try {
        if (keys) {
          chrome.storage.sync.get(keys, resolve);
        } else {
          chrome.storage.sync.get(resolve);
        }
      } catch {
        reject();
      }
    });

    return promise;
  },
};
