import { Settings } from "../util/settingsInterface";
import { loadSettings, overwriteSettings } from "../util/manageSettings";

console.log('Background Script: "Hello World"');

overwriteSettings({
  enabled: true,
  rules: [
    "sus",
    "sussy",
    "imposter",
    "impostor",
    "imposters",
    "impostors",
    "among us",
    "amongus",
    "amogus",
    "among",
    "amog",
    "crewmate",
    "crewmates",
  ],
});

let settings: Settings;

const cacheSettings = async () => {
  settings = await loadSettings();
  console.log({ newCache: settings });
};

cacheSettings();
chrome.storage.onChanged.addListener(cacheSettings);
chrome.runtime.onStartup.addListener(cacheSettings);
chrome.runtime.onInstalled.addListener(cacheSettings);

chrome.runtime.onMessage.addListener((message, sender, reply) => {
  console.log({ settingsBefore: settings });

  if (message == "settings") {
    if (!settings) {
      cacheSettings;
    }
    reply(settings);
  }
  console.log({
    settingsAfter: settings,
    message: message,
    sender: sender,
  });
});
