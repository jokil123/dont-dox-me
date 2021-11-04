import { Settings } from "../util/settingsInterface";
import { loadSettings, overwriteSettings } from "../util/manageSettings";

console.log('Background Script: "Hello World"');

const main = async () => {
  await overwriteSettings({
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
    console.log("Settings were updated", { updatedCache: settings });
  };

  await cacheSettings();
  chrome.storage.onChanged.addListener(cacheSettings);
  chrome.runtime.onStartup.addListener(cacheSettings);
  chrome.runtime.onInstalled.addListener(cacheSettings);

  chrome.runtime.onMessage.addListener(async (message, sender, reply) => {
    console.log("Settings were requested", { settings });

    if (message == "settings") {
      if (!settings) {
        await cacheSettings();
      }
      reply(settings);
    }
  });
};

main();
