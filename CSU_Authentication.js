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

(function() {
    'use strict';
    document.getElementById("username").value=username;
    document.getElementById("password").value=password;
    document.getElementById("login_submit").click();
})();