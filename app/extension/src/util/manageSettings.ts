import * as storage from "./asyncChromeStorage";
import { Settings, rule } from "./settingsInterface";
import { generateId } from "./idGenerator";
import { sendMessagePromise } from "./asyncSendMessage";

export const loadCachedSettings = async () => {
  let settings = await (<Promise<Settings>>sendMessagePromise("settings"));

  while (!settings) {
    console.log("Loading settings failed: Retrying!");
    settings = await (<Promise<Settings>>sendMessagePromise("settings"));
  }

  return settings;
};

export const loadSettings = async (): Promise<Settings> => {
  let config = await (await storage.get("config"))["config"];

  let storageBuckets: string[] = await (
    await storage.get("storageBuckets")
  )["storageBuckets"];

  if (!config || !storageBuckets) {
    console.log("couldn't find settings, loading defaults");

    await overwriteSettings({ enabled: true, rules: ["default stuff"] });
    return await loadSettings();
  }

  let rules: rule[] = (
    await Promise.all(
      storageBuckets.map((bucket) => {
        return storage.get(bucket);
      })
    )
  ).map((setting) => {
    return Object.values(setting)[0];
  });

  return <Settings>{
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

  Promise.all([
    ...settingIds.map((settingId) => {
      return storage.remove(settingId);
    }),
    storage.set({ storageBuckets: storageBuckets }),
  ]);
};

export const overwriteSettings = async (settings: Settings) => {
  await storage.clear();

  let rulesDict: { [key: string]: rule } = {};

  settings.rules.forEach((rule) => {
    rulesDict[`bucket_${generateId(20)}`] = rule;
  });

  let storageBuckets = Object.keys(rulesDict);

  let configStuff: any = { ...settings };
  delete configStuff.rules;

  await Promise.all([
    storage.set({ config: configStuff }),
    storage.set(rulesDict),
    storage.set({ storageBuckets: storageBuckets }),
  ]);
};
