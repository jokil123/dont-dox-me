import "./censorStyle.scss";

import { getTextNodesIn } from "./getTextNodes";
import { loadSettings, overwriteSettings } from "../../util/manageSettings";
import { settings } from "../../util/settingsInterface";
import { filterTextMutations } from "./filterMutations";
import { censorNodes } from "./censorNodes";
import * as pageHide from "./hideWebpage";
import { filterNodes } from "./censorIgnore";

const main = async () => {
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

    let filteredTextMutations = filterTextMutations(m);

    let hiddenElements: HTMLElement[] = [];

    filteredTextMutations.forEach((e) => {
      if (e.parentElement) {
        hiddenElements.push(e.parentElement);
        pageHide.hide(e.parentElement);
        console.log();
      }
    });

    filteredTextMutations.forEach((m) => {
      censorNodes(getTextNodesIn(m, true), settings.rules);
    });

    hiddenElements.forEach((e) => {
      pageHide.show(e);
    });

    characterDataObserver.observe(document.body, observeSettings);
  });

  characterDataObserver.observe(document.body, observeSettings);
};

main();
