import { censorNodes } from "./censorNodes";
import { filterElementMutations, filterTextMutations } from "./filterMutations";
import { getTextNodesIn } from "./getTextNodes";
import { Settings } from "../../util/settingsInterface";
import * as pageHide from "./hideWebpage";
import { censorIllegalElements, filterIllegalElements } from "./censorTags";

const textObserveSettings = {
  subtree: true,
  characterData: true,
  attributes: true,
  childList: true,
};

// Setups the mutation observer to listen for changes to the dom and test / censor new or changed elements
export const setupTextObserver = (settings: Settings) => {
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
    filteredTextMutations.forEach((n) => {
      censorNodes(getTextNodesIn(n, true), settings.rules);
    });

    // temporarily hidden elements are now shown again
    hiddenElements.forEach((n) => {
      pageHide.show(n);
    });

    // at the end the observer is re-enabled
    // console.log(document.body);
    observer.observe(document.body, textObserveSettings);
  });

  observer.observe(document.body, textObserveSettings);
};

const elementObserveSettings = {
  subtree: true,
  attributes: true,
  childList: true,
};

export const setupElementObserver = (settings: Settings) => {
  let observer = new MutationObserver((m) => {
    observer.disconnect();

    let filteredMutations = filterElementMutations(m);

    let illegalElements = filterIllegalElements(
      filteredMutations,
      settings.rules
    );

    // makes a list of all text nodes which have to be temporarily hidden
    let hiddenElements: HTMLElement[] = <HTMLElement[]>illegalElements
      .map((n) => {
        return n.parentElement;
      })
      .filter((n) => {
        return n instanceof HTMLElement;
      });

    // hides all new elements until they are censored
    hiddenElements.forEach((e) => {
      pageHide.hide(e);
    });

    censorIllegalElements(illegalElements);

    hiddenElements.forEach((e) => {
      pageHide.show(e);
    });

    observer.observe(document.body, elementObserveSettings);
  });
  observer.observe(document.body, elementObserveSettings);
};
