import "./censorStyle.scss";

import { getTextNodesIn } from "./getTextNodes";
import { loadCachedSettings } from "../../util/manageSettings";
import { Settings } from "../../util/settingsInterface";
import { censorNodes } from "./censorNodes";
import * as pageHide from "./hideWebpage";
import { filterNodes } from "./censorIgnore";
import { setupObserver } from "./pageMutationHandler";

console.log("Content Script Loaded");

// console.log(chrome.runtime);

// let test = chrome.runtime.onConnect.addListener(function (port) {
//   console.log(port);
// });

// console.log(chrome.runtime);

// console.log(chrome.runtime.onConnect.hasListeners());

const main = async () => {
  console.log("Censoring Started");

  let settings: Settings = await loadCachedSettings();

  console.log(settings);

  if (settings.enabled) {
    let nodes = getTextNodesIn(document.body, true);

    censorNodes(filterNodes(nodes), settings.rules);
    setupObserver(settings);
  }

  pageHide.show();

  console.log("Censoring Finished");
};

main();
