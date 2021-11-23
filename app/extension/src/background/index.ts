import { Settings } from "../util/settingsInterface";
import { loadSettings, overwriteSettings } from "../util/manageSettings";

console.log('Background Script: "Hello World"');

const main = async () => {
  await chrome.runtime.sendMessage("readyToSend");

  // Example settings are loaded into storage
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
    // fetches the settings (slow)
    settings = await loadSettings();
    console.log("Settings were updated", { updatedCache: settings });
  };

  await cacheSettings();
  // on change of sync settings, update the cache
  chrome.storage.onChanged.addListener(cacheSettings);
  // when the extension is installed or started, update the cache
  chrome.runtime.onStartup.addListener(cacheSettings);
  chrome.runtime.onInstalled.addListener(cacheSettings);

  // listen for settings requests from content scripts
  chrome.runtime.onMessage.addListener(async (message, sender, reply) => {
    console.log("Settings were requested", { settings });

    switch (message) {
      case "settings":
        // if for some reason no settings are cached, cache them
        if (!settings) {
          cacheSettings().then(() => {
            reply(settings);
            console.log("message handled slowly");
          });
        } else {
          reply(settings);
        }

        console.log("message handled");
        return true; // return true to indicate that the message was handled

      case "isReadyToSend":
        console.log("i am readyToSend");
        reply(true);
        return true;

      default:
        return false;
    }
  });
};

main();
