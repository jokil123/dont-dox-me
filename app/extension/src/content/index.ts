import "./censorStyle.scss";

import { wrapWithSpans } from "./util/textWrapper";
import { getTextNodesIn } from "./getTextNodes";
import { findIllegalNodeContent } from "./isIllegal";
import { loadSettings, overwriteSettings } from "./loadSettings";
import { settings } from "./settingsInterface";

console.log('Content Script: "Hello World"');

const main = async () => {
  let settings: settings = await loadSettings();

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
};

main();
