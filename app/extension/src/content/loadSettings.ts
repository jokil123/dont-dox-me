import * as storage from "./util/asyncChromeStorage";

export interface setting {
  text: string;
}

export const loadSettings = async (): Promise<setting[]> => {
  await storage.set({ storageBuckets: ["a", "b"] });
  await storage.set({ a: { text: "aText" } });
  await storage.set({ b: { text: "bText" } });
  let storageBuckets: string[] = (await storage.get("storageBuckets"))[
    "storageBuckets"
  ];

  let settings: setting[] = (
    await Promise.all(
      storageBuckets.map((bucket) => {
        return storage.get(bucket);
      })
    )
  ).map((setting) => {
    return Object.values(setting)[0];
  });

  return settings;
};

export const deleteSettings = async (settingIds: string[]): Promise<void> => {
  let storageBuckets: string[] = (await storage.get("storageBuckets"))[
    "storageBuckets"
  ];

  storageBuckets = storageBuckets.filter((bucket) => {
    return !settingIds.includes(bucket);
  });

  await Promise.all([
    ...settingIds.map((settingId) => {
      return storage.remove(settingId);
    }),
    storage.set({ storageBuckets: storageBuckets }),
  ]);
};
