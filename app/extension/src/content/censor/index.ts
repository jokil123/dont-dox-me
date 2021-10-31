import "./censorStyle.scss";

import { getTextNodesIn } from "./getTextNodes";
import { loadSettings, overwriteSettings } from "../../util/manageSettings";
import { settings } from "../../util/settingsInterface";
import { censorNodes } from "./censorNodes";
import * as pageHide from "./hideWebpage";
import { filterNodes } from "./censorIgnore";
import { setupObserver } from "./pageMutationHandler";

const main = async () => {
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

  let settings: settings = await loadSettings();

  if (settings) {
    if (settings.enabled) {
      let nodes = getTextNodesIn(document.body, true);

      censorNodes(filterNodes(nodes), settings.rules);
    }
  } else {
    await overwriteSettings({ enabled: false, rules: [] });
  }

  pageHide.show();

  setupObserver(settings);
};

main();
