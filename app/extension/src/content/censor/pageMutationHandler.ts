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

// Setups the mutation observer to listen for changes to the dom and test / censor new or changed elements
export const setupObserver = (settings: Settings) => {
  let observer = new MutationObserver((m) => {
    // before censoring the page, the observer is disabled to prevent the observer from being triggered again
    observer.disconnect();

    let filteredTextMutations = filterTextMutations(m);

    // makes a list of all text nodes which have to be temporarily hidden
    let hiddenElements: HTMLElement[] = <HTMLElement[]>filteredTextMutations
      .map((n) => {
        return n.parentElement;
      })
      .filter((n) => {
        return n;
      });

    // hides all new elements until they are censored
    hiddenElements.forEach((n) => {
      pageHide.hide(n);
    });

    // censors the updated nodes
    filteredTextMutations.forEach((m) => {
      censorNodes(getTextNodesIn(m, true), settings.rules);
    });

    // temporarily hidden elements are now shown again
    hiddenElements.forEach((n) => {
      pageHide.show(n);
    });

    // at the end the observer is re-enabled
    observer.observe(document.body, observeSettings);
  });

  observer.observe(document.body, observeSettings);
};
