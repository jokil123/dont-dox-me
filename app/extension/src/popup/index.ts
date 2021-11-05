import "./style.scss";

import { loadCachedSettings } from "../util/manageSettings";

// for testing purposes settings are displayed in the popup
loadCachedSettings().then((e) => {
  e.rules.forEach((rule) => {
    document.writeln(rule);
  });
});

console.log('Popup Script: "Hello World"');
