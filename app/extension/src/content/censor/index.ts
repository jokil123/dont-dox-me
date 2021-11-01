import "./censorStyle.scss";

import { getTextNodesIn } from "./getTextNodes";
import {
  loadCachedSettings,
  overwriteSettings,
} from "../../util/manageSettings";
import { Settings } from "../../util/settingsInterface";
import { censorNodes } from "./censorNodes";
import * as pageHide from "./hideWebpage";
import { filterNodes } from "./censorIgnore";
import { setupObserver } from "./pageMutationHandler";

console.log("Content Script Start");

const main = async () => {
  let settings: Settings = await loadCachedSettings();

  console.log(settings);

  if (settings.enabled) {
    let nodes = getTextNodesIn(document.body, true);

    censorNodes(filterNodes(nodes), settings.rules);
  }

  pageHide.show();

  setupObserver(settings);
};

main();
