import "./censorStyle.scss";

import { getTextNodesIn } from "./getTextNodes";
import { loadCachedSettings } from "../../util/manageSettings";
import { Settings } from "../../util/settingsInterface";
import { censorNodes } from "./censorNodes";
import * as pageHide from "./hideWebpage";
import { filterNodes } from "./censorIgnore";
import { setupElementObserver, setupTextObserver } from "./pageMutationHandler";
import { censorIllegalElements, findIllegalElements } from "./censorTags";

console.log("Content Script Loaded");

const main = async () => {
  console.log("Censoring Started");
  let settings: Settings = await loadCachedSettings();

  console.log(settings);

  if (settings.enabled) {
    let nodes = getTextNodesIn(document.body, true);

    censorNodes(filterNodes(nodes), settings.rules);
    setupTextObserver(settings);

    censorIllegalElements(findIllegalElements(document.body, settings.rules));
  }

  pageHide.show();

  console.log("Censoring Finished");

  censorIllegalElements(findIllegalElements(document.body, settings.rules));

  setupElementObserver(settings);
};

main();
