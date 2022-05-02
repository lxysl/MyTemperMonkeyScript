// ==UserScript==
// @name         SolveAlarm
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://47.106.106.126/Cgo8/MainPage
// @match        http://47.106.106.126/Cgo8/MainPage/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let startHour = 19;
let startMinute = 0;
let endHour = 20;
let endMinute = 59;

let startTime = startHour * 60 + startMinute;
let endTime = endHour * 60 + endMinute;

if (startHour < 0 || startHour > 24 || Math.floor(startHour) !== startHour) {
    alert('开始小时数设置错误');
}
if (endHour < 0 || endHour > 24 || Math.floor(endHour) !== endHour) {
    alert('结束小时数设置错误');
}
if (startMinute < 0 || startMinute > 59 || Math.floor(startMinute) !== startMinute) {
    alert('开始分钟数设置错误');
}
if (endMinute < 0 || endMinute > 59 || Math.floor(endMinute) !== endMinute) {
    alert('结束分钟数设置错误');
}
if (endTime < startTime) {
    alert('时间设置错误');
}

function solveAlarm() {
    var cur = new Date();
    var curTime = cur.getHours() * 60 + cur.getMinutes();
    if (curTime >= startTime && curTime <= endTime) {
        document.querySelector("#realtime_logtab > div.tabs-header.tabs-header-noborder > div.tabs-wrap > ul > li:nth-child(6) > a").click();
        if (!document.querySelector("#Safetyalarm > div.easyui-layout.layout.easyui-fluid > div.panel.layout-panel.layout-panel-center.panel-htop > div > div > div > div > div.datagrid-view2 > div.datagrid-header > div > table > tbody > tr > td:nth-child(1) > div > input[type=checkbox]").checked) {
            document.querySelector("#Safetyalarm > div.easyui-layout.layout.easyui-fluid > div.panel.layout-panel.layout-panel-center.panel-htop > div > div > div > div > div.datagrid-view2 > div.datagrid-header > div > table > tbody > tr > td:nth-child(1) > div > input[type=checkbox]").click();
        }
        if (!document.querySelector("#safe_ProAlarmlist > div > div > div > div.datagrid-view2 > div.datagrid-header > div > table > tbody > tr > td:nth-child(1) > div > input[type=checkbox]").checked) {
            document.querySelector("#safe_ProAlarmlist > div > div > div > div.datagrid-view2 > div.datagrid-header > div > table > tbody > tr > td:nth-child(1) > div > input[type=checkbox]").click();
        }
        document.querySelector("#btn_batch").click();
        if (document.querySelector("#AlarmPro_Text").style.display !== 'none') {
            document.querySelector("#Text").value = "注意安全！";
            document.querySelector("#AlarmCmdPro_Text > tbody > tr:nth-child(5) > td > div > input:nth-child(1)").click();
            document.querySelector("body > div.panel.window.window-thinborder.panel-htop.messager-window > div.dialog-button.messager-button > a:nth-child(1)").click();
        }
        if (document.querySelector("#Safetyalarm > div.easyui-layout.layout.easyui-fluid > div.panel.layout-panel.layout-panel-center.panel-htop > div > div > div > div > div.datagrid-view2 > div.datagrid-header > div > table > tbody > tr > td:nth-child(1) > div > input[type=checkbox]").checked) {
            document.querySelector("#Safetyalarm > div.easyui-layout.layout.easyui-fluid > div.panel.layout-panel.layout-panel-center.panel-htop > div > div > div > div > div.datagrid-view2 > div.datagrid-header > div > table > tbody > tr > td:nth-child(1) > div > input[type=checkbox]").click();
        }
        if (document.querySelector("#safe_ProAlarmlist > div > div > div > div.datagrid-view2 > div.datagrid-header > div > table > tbody > tr > td:nth-child(1) > div > input[type=checkbox]").checked) {
            document.querySelector("#safe_ProAlarmlist > div > div > div > div.datagrid-view2 > div.datagrid-header > div > table > tbody > tr > td:nth-child(1) > div > input[type=checkbox]").click();
        }
    }
}

function refresh() {
    window.location.reload();
}

(function () {
    'use strict';
    window.onload = function () {
        console.log('脚本已启动');
        var loop = setInterval(solveAlarm, 20000);
    };
})();
