// ==UserScript==
// @name         CSU_Authentication
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://ca.csu.edu.cn/authserver/*
// @grant        none
// ==/UserScript==

var username="";
var password="";

window.addEventListener('load', function() {
    'use strict';
    document.querySelector("#username").value=username;
    document.querySelector("#password").value=password;
    document.querySelector("#login_submit").click();
}, false);