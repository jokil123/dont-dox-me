import "./style.scss";

import { loadSettings } from "../util/manageSettings";

loadSettings().then((e) => {
  e.rules.forEach((rule) => {
    document.writeln(rule);
  });
});

console.log('Popup Script: "Hello World"');
