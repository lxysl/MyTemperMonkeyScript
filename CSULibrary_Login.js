// ==UserScript==
// @name         CSULibrary_Login
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://lib.csu.edu.cn/
// @match        http://libuser.csu.edu.cn/center/ifcuas/*
// @grant        none
// ==/UserScript==

var username="8207180313";
var password="030733";

(function() {
    'use strict';

    document.getElementById("userId").value=username;
    document.getElementById("password").value=password;
    document.getElementsByTagName("form")[0].submit();
})();