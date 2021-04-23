import whatwg_fetch from "whatwg-fetch";
if (!global.fetch) {
  for (let key in whatwg_fetch) {
    if (whatwg_fetch.hasOwnProperty(key)) {
      window[key] = whatwg_fetch[key];
      global[key] = window[key];
    }
  }
}

import localStorage from "localStorage";
//noinspection JSAnnotator
window.localStorage = localStorage;
global.localStorage = window.localStorage;

global.raf = global.requestAnimationFrame = cb => {
  setTimeout(cb, 0);
};

console.log = require("test/utils/logger");