import { censorNodes } from "./censorNodes";
import { filterTextMutations } from "./filterMutations";
import { getTextNodesIn } from "./getTextNodes";
import { Settings } from "../../util/settingsInterface";
import * as pageHide from "./hideWebpage";

const observeSettings = {
  subtree: true,
  characterData: true,
  attributes: true,
  childList: true,
};

export const setupObserver = (settings: Settings) => {
  let observer = new MutationObserver((m) => {
    observer.disconnect();

    let filteredTextMutations = filterTextMutations(m);

    let hiddenElements: HTMLElement[] = <HTMLElement[]>filteredTextMutations
      .map((n) => {
        return n.parentElement;
      })
      .filter((n) => {
        return n;
      });

    hiddenElements.forEach((n) => {
      pageHide.hide(n);
    });

    filteredTextMutations.forEach((m) => {
      censorNodes(getTextNodesIn(m, true), settings.rules);
    });

    hiddenElements.forEach((n) => {
      pageHide.show(n);
    });

    observer.observe(document.body, observeSettings);
  });

  observer.observe(document.body, observeSettings);
};
