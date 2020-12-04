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
    if (document.getElementsByTagName('body')[0].style.zoom === "") {
        if (screen.width === 2560 && screen.height === 1441) {
            document.getElementsByTagName('body')[0].style.zoom = 1.5;
        }
        if (screen.width === 1536 && screen.height === 864) {
            document.getElementsByTagName('body')[0].style.zoom = 1;
        }
    }
    if (document.getElementsByTagName('body')[0].style.zoom === "1.5") {
        if (screen.width === 1536 && screen.height === 864) {
            document.getElementsByTagName('body')[0].style.zoom = 1;
        }
    }
    if (document.getElementsByTagName('body')[0].style.zoom === "1") {
        if (screen.width === 2560 && screen.height === 1441) {
            document.getElementsByTagName('body')[0].style.zoom = 1.5;
        }
    }
})();