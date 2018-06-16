import whatwg_fetch from "whatwg-fetch";
//console.log("whatwg_fetch");
//console.log(whatwg_fetch);

if (!global.fetch) {
  for(let key in whatwg_fetch) {
    if(whatwg_fetch.hasOwnProperty(key)) {
      window[key] = whatwg_fetch[key];
      global[key] = window[key];
    }
  }
}

//console.log(Headers);
//console.log(fetch);

//console.log(window);

import localStorage from "localStorage";
//noinspection JSAnnotator
window.localStorage = localStorage;
global.localStorage = window.localStorage;