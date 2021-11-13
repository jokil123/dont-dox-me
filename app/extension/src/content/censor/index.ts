import "./censorStyle.scss";

import { getTextNodesIn } from "./getTextNodes";
import { loadCachedSettings } from "../../util/manageSettings";
import { Settings } from "../../util/settingsInterface";
import { censorNodes } from "./censorNodes";
import * as pageHide from "./hideWebpage";
import { filterNodes } from "./censorIgnore";
import { setupObserver } from "./pageMutationHandler";
import { connectListener } from "../../util/asyncSendMessage";

console.log("Content Script Loaded");

connectListener();

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
