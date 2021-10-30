import "./censorStyle.scss";

import { getTextNodesIn } from "./getTextNodes";
import { loadSettings, overwriteSettings } from "../../util/manageSettings";
import { settings } from "../../util/settingsInterface";
import { filterTextMutations } from "./filterMutations";
import { censorNodes } from "./censorNodes";
import * as pageHide from "./hideWebpage";
import { filterNodes } from "./censorIgnore";

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

  let observeSettings = {
    subtree: true,
    characterData: true,
    attributes: true,
    childList: true,
  };

  let characterDataObserver = new MutationObserver((m) => {
    characterDataObserver.disconnect();

    // console.log({
    //   unfiltered: m,
    //   filtered: filterTextMutations(m),
    // });

    filterTextMutations(m).forEach((m) => {
      censorNodes(getTextNodesIn(m, true), settings.rules);
    });

    characterDataObserver.observe(document.body, observeSettings);
  });

  characterDataObserver.observe(document.body, observeSettings);
};

main();
