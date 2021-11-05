import * as storage from "./asyncChromeStorage";
import { Settings, rule } from "./settingsInterface";
import { generateId } from "./idGenerator";
import { sendMessagePromise } from "./asyncSendMessage";

// load settings from cache
export const loadCachedSettings = async () => {
  let settings = await (<Promise<Settings>>sendMessagePromise("settings"));

  // settings are sometimes undefined, so we need to check for that
  while (!settings) {
    // if settings are undefined, we try again until we get a non-undefined value
    console.log("Loading settings failed: Retrying!");
    settings = await (<Promise<Settings>>sendMessagePromise("settings"));
  }

  return settings;
};

// load settings from chrome storage
// this might be very slow
export const loadSettings = async (): Promise<Settings> => {
  // config are settings like enabled, etc.
  let config = await (await storage.get("config"))["config"];

  // the ids of the storage buckets with the individual rules
  // storage is split up this way to prevent storage overflow errors
  let storageBuckets: string[] = await (
    await storage.get("storageBuckets")
  )["storageBuckets"];

  // the config or the storageBuckets are undefined, we recursively call this function until we get a non-undefined value
  if (!config || !storageBuckets) {
    console.log("couldn't find settings, loading defaults");

    // because this should only happen when the extension is first installed, we set some default values
    await overwriteSettings({ enabled: true, rules: ["default stuff"] });
    return await loadSettings();
  }

  // the rules are then loaded from the storage buckets
  let rules: rule[] = (
    await Promise.all(
      storageBuckets.map((bucket) => {
        return storage.get(bucket);
      })
    )
  ).map((setting) => {
    return Object.values(setting)[0];
  });

  // because loading might fail, we check that the count of rules and storageBuckets is the same
  if (rules.length !== storageBuckets.length) {
    throw new Error("The number of rules and storageBuckets is not the same!");
  }

  return <Settings>{
    ...config,
    rules: rules,
  };
};

// delete a list of rules from the settings
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

// overwrite the settings with the given settings
export const overwriteSettings = async (settings: Settings) => {
  // first, all storage is cleared (this have to be change in the future)
  await storage.clear();

  let rulesDict: { [key: string]: rule } = {};

  // the rules are then stored in a dict by their storage bucket id
  settings.rules.forEach((rule) => {
    rulesDict[`bucket_${generateId(20)}`] = rule;
  });

  // a list of all storage bucket ids
  let storageBuckets = Object.keys(rulesDict);

  // the rules are then removed from the settings object to create the config object
  // this is unnecessarily complex and should be changed in the future
  let configStuff: { [key: string]: unknown } = { ...settings };
  delete configStuff.rules;

  // this await may be unnecessary and worsens performance
  await Promise.all([
    storage.set({ config: configStuff }),
    storage.set(rulesDict),
    storage.set({ storageBuckets: storageBuckets }),
  ]);
};
