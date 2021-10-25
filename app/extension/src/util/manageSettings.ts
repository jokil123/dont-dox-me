import * as storage from "./asyncChromeStorage";
import { settings, rule } from "./settingsInterface";
import { generateId } from "./idGenerator";

export const loadSettings = async (): Promise<settings> => {
  let config = (await storage.get("config"))["config"];

  let storageBuckets: string[] = (await storage.get("storageBuckets"))[
    "storageBuckets"
  ];

  let rules: rule[] = (
    await Promise.all(
      storageBuckets.map((bucket) => {
        return storage.get(bucket);
      })
    )
  ).map((setting) => {
    return Object.values(setting)[0];
  });

  return <settings>{
    ...config,
    rules: rules,
  };
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

export const overwriteSettings = async (settings: settings) => {
  await storage.clear();

  let rulesDict: { [key: string]: rule } = {};

  settings.rules.forEach((rule) => {
    rulesDict[`bucket_${generateId(20)}`] = rule;
  });

  let storageBuckets = Object.keys(rulesDict);

  let config: any = { ...settings };
  delete config.rules;

  await Promise.all([
    storage.set({ config: config }),
    storage.set(rulesDict),
    storage.set({ storageBuckets: storageBuckets }),
  ]);
};
