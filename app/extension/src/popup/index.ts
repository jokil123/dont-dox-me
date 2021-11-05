import "./style.scss";

import { loadCachedSettings } from "../util/manageSettings";

loadCachedSettings().then((e) => {
  e.rules.forEach((rule) => {
    document.writeln(rule);
  });
});

console.log('Popup Script: "Hello World"');
