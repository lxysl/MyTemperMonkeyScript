// ==UserScript==
// @name         Screen_Zoom
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include      *
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    console.log("屏幕分辨率为：" + screen.width + "*" + screen.height);
    if (screen.width === 2560 && screen.height === 1440) {
        document.body.style.zoom = "100%";
        document.body.style.zoom = "125%";
    }
    if (screen.width === 1920 && screen.height === 1080) {
        document.body.style.zoom = "100%";
    }
})();
