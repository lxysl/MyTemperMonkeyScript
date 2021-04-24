// ==UserScript==
// @name         Dormitory_Login
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://61.137.86.87:8080/portalNat444/index.jsp
// @grant        none
// ==/UserScript==

var username="";
var password="";

(function() {
    'use strict';
    document.getElementById("account").value=username;
    document.getElementById("userPassword").value=password;
    document.getElementById("login_button").click();
})();