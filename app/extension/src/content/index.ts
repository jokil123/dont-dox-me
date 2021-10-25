import "./censorStyle.scss";

import { getTextNodesIn } from "./getTextNodes";
import { loadSettings, overwriteSettings } from "../util/manageSettings";
import { settings } from "./settingsInterface";
import { filterTextMutations } from "./filterMutations";
import { censorNodes } from "./censorNodes";
import * as pageHide from "./hideWebpage";

const main = async () => {
  let settings: settings = await loadSettings();

  if (settings) {
    if (settings.enabled) {
      let nodes = getTextNodesIn(document.body, true);

      censorNodes(nodes, settings.rules);
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

    console.log({
      unfiltered: m,
      filtered: filterTextMutations(m),
    });

    filterTextMutations(m).forEach((m) => {
      censorNodes(getTextNodesIn(m, true), settings.rules);
    });

    characterDataObserver.observe(document.body, observeSettings);
  });

  characterDataObserver.observe(document.body, observeSettings);
};

main();
