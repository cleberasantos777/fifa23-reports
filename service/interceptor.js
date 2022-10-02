"use strict";
var XUTSID = 'sem chave';

chrome.webRequest.onCompleted.addListener(
  (e) => {
    if (e.method == 'POST') {
      e.responseHeaders.forEach(header => {
        if (header.name == 'X-UT-SID') {
          XUTSID = header.value
        }
      })
    }
  }, {
  urls: [
    'https://utas.mob.v1.fut.ea.com/ut/auth'
  ],
  types: ['main_frame', 'sub_frame', 'xmlhttprequest']
},
  ["responseHeaders"]
);

