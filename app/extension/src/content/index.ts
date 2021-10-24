import "./censorStyle.scss";

import { wrapWithSpans } from "../util/textWrapper";
import { getTextNodesIn } from "./getTextNodes";
import { findIllegalNodeContent } from "./isIllegal";
import { loadSettings, overwriteSettings } from "../util/manageSettings";
import { settings } from "./settingsInterface";

console.log('Content Script: "Hello World"');

const main = async () => {
  let settings: settings = await loadSettings();

  if (settings) {
    if (settings.enabled) {
      let nodes = getTextNodesIn(document.body, true);

      nodes.forEach((node) => {
        let pos = findIllegalNodeContent(node, settings.rules);
        if (pos.length != 0) {
          let spans = wrapWithSpans(node, pos);

          spans.forEach((span) => {
            span.className = "censor text";
          });
        }
      });
    }
  } else {
    await overwriteSettings({ enabled: false, rules: [] });
  }
};

main();
