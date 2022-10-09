// ==UserScript==
// @name         SolveAlarm
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://47.106.106.126/Cgo8/MainPage/#
// @match        http://47.106.106.126/Cgo8/MainPage/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let startHour = 5;
let startMinute = 0;
let endHour = 23;
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

let alarmDict = {
    "疲劳驾驶": "您已超速，请减速行驶！",
    "疲劳驾驶预警": "您已疲劳驾驶，为了您及他人的人身财产安全，请及时休息后驾驶！",
    "当天累计驾驶超时": "您已疲劳驾驶，为了您及他人的人身财产安全，请及时休息后驾驶！",
    "超速-系统超速": "您已超速，请减速行驶！",
    "超速-道路限速": "您已超速，请减速行驶！",
    "超速-路网限速": "您已超速，请减速行驶！",
    "超速-路口超速": "您已超速，请减速行驶！",
    "规范-异常停车": "为了您及他人的人身财产安全，请安全驾驶！",
    "规范-驾驶员异常": "为了您及他人的人身财产安全，请及时休息后驾驶！",
    "行为-生理疲劳": "您已疲劳驾驶，为了您及他人的人身财产安全，请及时休息后驾驶！",
    "行为-抽烟报警": "为了您及他人的人身财产安全，请安全驾驶！",
    "行为-接打电话": "请驾驶员不要看手机，注意安全！",
    "行为-分神驾驶": "您已疲劳驾驶，为了您及他人的人身财产安全，请及时休息后驾驶！",
    "习惯-前向碰撞预警": "为了您及他人的人身财产安全，请安全驾驶！",
    "习惯-车道偏离报警": "您已偏离线路，请在规定的线路范围内行使！",
    "习惯-车距过近预警": "为了您及他人的人身财产安全，请安全驾驶！",
    "摄像头故障": "为了您及他人的人身财产安全，请安全驾驶！",
    "碰撞预警": "为了您及他人的人身财产安全，请安全驾驶！",
    "侧翻预警": "为了您及他人的人身财产安全，请安全驾驶！",
    "前向碰撞报警": "为了您及他人的人身财产安全，请安全驾驶！",
    "车道偏离报警": "您已偏离线路，请在规定的线路范围内行使！",
    "车距过近报警": "为了您及他人的人身财产安全，请安全驾驶！",
    "行人碰撞报警": "为了您及他人的人身财产安全，请及时休息后驾驶！",
    "生理疲劳驾驶报警(DSM)": "您已疲劳驾驶，为了您及他人的人身财产安全，请及时休息后驾驶！",
    "接打电话报警": "请驾驶员不要看手机，注意安全！",
    "抽烟报警": "为了您及他人的人身财产安全，请安全驾驶！",
    "分神驾驶报警": "为了您及他人的人身财产安全，请安全驾驶！",
    "未检测到驾驶员报警": "为了您及他人的人身财产安全，请安全驾驶！",
    "未系安全带": "请驾驶员 押运员系好安全带！注意行车安全！",
    "打哈欠": "您已疲劳驾驶，为了您及他人的人身财产安全，请及时休息后驾驶！",
    "闭眼": "您已疲劳驾驶，为了您及他人的人身财产安全，请及时休息后驾驶！",
    "喝水": "为了您及他人的人身财产安全，请安全驾驶！",
    "驾驶员不系安全带报警": "请驾驶员 押运员系好安全带！注意行车安全！",
    "后方接近报警": "为了您及他人的人身财产安全，请安全驾驶！",
    "左侧后方接近报警": "为了您及他人的人身财产安全，请安全驾驶！",
    "右侧后方接近报警": "为了您及他人的人身财产安全，请安全驾驶！",
    "疲劳驾驶": "您已疲劳驾驶，为了您及他人的人身财产安全，请及时休息后驾驶！",
    "疲劳驾驶预警": "您已疲劳驾驶，为了您及他人的人身财产安全，请及时休息后驾驶！",
    "超速-系统超速": "您已超速，请减速行驶！",
    "超速-道路限速": "您已超速，请减速行驶！",
    "超速-路网限速": "您已超速，请减速行驶！",
    "超速-路口超速": "您已超速，请减速行驶！",
    "行为-生理疲劳": "您已疲劳驾驶，为了您及他人的人身财产安全，请及时休息后驾驶！",
    "行为-抽烟报警": "为了您及他人的人身财产安全，请安全驾驶！",
    "行为-接打电话": "请驾驶员不要看手机，注意安全！",
    "行为-分神驾驶": "您已疲劳驾驶，为了您及他人的人身财产安全，请及时休息后驾驶！",
    "超速报警": "您已超速，请减速行驶！",
    "路网超速": "您已超速，请减速行驶！",
    "路网限速": "您已超速，请减速行驶！",
};

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

async function activeSafetyLoop() {
    document.querySelector("#realtime_logtab > div.tabs-header.tabs-header-noborder > div.tabs-wrap > ul > li:nth-child(6) > a").click();
    await sleep(1000);
    var items = document.querySelector("#Safetyalarm > div.easyui-layout.layout.easyui-fluid > div.panel.layout-panel.layout-panel-center.panel-htop > div > div > div > div > div.datagrid-view2 > div.datagrid-body > table > tbody").children;
    for (let i = 0; i < items.length; i++) {
        var checkbox = items[i].children[0].querySelector("div > input");
        var alarm_name = items[i].children[3].querySelector("div").textContent;
        if (checkbox !== null) {
            if (!checkbox.checked) {
                checkbox.click();
            }
            if (!document.querySelector("#safe_ProAlarmlist > div > div > div > div.datagrid-view2 > div.datagrid-header > div > table > tbody > tr > td:nth-child(1) > div > input[type=checkbox]").checked) {
                document.querySelector("#safe_ProAlarmlist > div > div > div > div.datagrid-view2 > div.datagrid-header > div > table > tbody > tr > td:nth-child(1) > div > input[type=checkbox]").click();
            }
            document.querySelector("#btn_batch").click();
            await sleep(1000);
            if (document.querySelector("#AlarmPro_Text").style.display !== 'none') {
                document.querySelector("#Text").value = alarmDict[alarm_name] !== undefined ? alarmDict[alarm_name] : "注意安全！";
                document.querySelector("#AlarmLog_Pro").value = alarmDict[alarm_name] !== undefined ? alarmDict[alarm_name] : "注意安全！";
                await sleep(2000);
                document.querySelector("#recordProWindow > div > table > tbody > tr:nth-child(4) > td > div > input:nth-child(1)").click();
                document.querySelector("body > div.panel.window.window-thinborder.panel-htop.messager-window > div.dialog-button.messager-button > a:nth-child(1)").click();
            }
            await sleep(2000);
        }
    }
    console.log("已分条处理：主动安全");
}

function activeSafety() {
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
        document.querySelector("#AlarmLog_Pro").value = "注意安全！";
        document.querySelector("#recordProWindow > div > table > tbody > tr:nth-child(4) > td > div > input:nth-child(1)").click();
        document.querySelector("body > div.panel.window.window-thinborder.panel-htop.messager-window > div.dialog-button.messager-button > a:nth-child(1)").click();
    }
    if (document.querySelector("#Safetyalarm > div.easyui-layout.layout.easyui-fluid > div.panel.layout-panel.layout-panel-center.panel-htop > div > div > div > div > div.datagrid-view2 > div.datagrid-header > div > table > tbody > tr > td:nth-child(1) > div > input[type=checkbox]").checked) {
        document.querySelector("#Safetyalarm > div.easyui-layout.layout.easyui-fluid > div.panel.layout-panel.layout-panel-center.panel-htop > div > div > div > div > div.datagrid-view2 > div.datagrid-header > div > table > tbody > tr > td:nth-child(1) > div > input[type=checkbox]").click();
    }
    if (document.querySelector("#safe_ProAlarmlist > div > div > div > div.datagrid-view2 > div.datagrid-header > div > table > tbody > tr > td:nth-child(1) > div > input[type=checkbox]").checked) {
        document.querySelector("#safe_ProAlarmlist > div > div > div > div.datagrid-view2 > div.datagrid-header > div > table > tbody > tr > td:nth-child(1) > div > input[type=checkbox]").click();
    }
    console.log("已处理：主动安全");
}

function alarmCollection() {
    document.querySelector("#realtime_logtab > div.tabs-header.tabs-header-noborder > div.tabs-wrap > ul > li:nth-child(5) > a").click();
    document.querySelector("#openVADialog").click();
    Global.RealTime.alarmProcessContext.openHistoryAlarmDialog();
    Global.RealTime.alarmProcessContext.loadHistoryAlarm();
    if (!document.querySelector("#alarmProDialog > div.easyui-layout.layout.easyui-fluid > div.panel.layout-panel.layout-panel-center.panel-htop.layout-split-center > div > div > div > div > div.datagrid-view2 > div.datagrid-header > div > table > tbody > tr > td:nth-child(1) > div > input[type=checkbox]").checked) {
        document.querySelector("#alarmProDialog > div.easyui-layout.layout.easyui-fluid > div.panel.layout-panel.layout-panel-center.panel-htop.layout-split-center > div > div > div > div > div.datagrid-view2 > div.datagrid-header > div > table > tbody > tr > td:nth-child(1) > div > input[type=checkbox]").click();
    }
    Global.RealTime.alarmProcessContext.proHandle(9);
    if (document.querySelector("body > div.panel.window.window-thinborder.panel-htop.messager-window > div.dialog-button.messager-button > a")) {
        document.querySelector("body > div.panel.window.window-thinborder.panel-htop.messager-window > div.dialog-button.messager-button > a").click();
    } else {
        Global.RealTime.alarmProcessContext.alarmProHandle('clear');
    }
    Global.RealTime.alarmProcessContext.proHandle(6);
    console.log("已处理：报警汇总");
}

async function solveAlarm() {
    var cur = new Date();
    var curTime = cur.getHours() * 60 + cur.getMinutes();
    if (curTime >= startTime && curTime <= endTime) {
        activeSafetyLoop();
        alarmCollection();
    }
}

function refresh() {
    window.location.reload();
}

(function () {
    'use strict';
    window.onload = function () {
        console.log('脚本已启动');
        var loop = setInterval(solveAlarm, 60000);
    };
})();