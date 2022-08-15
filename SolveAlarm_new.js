// ==UserScript==
// @name         New SolveAlarm
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://vms.cnpc.com.cn:9999/gps-web/main.html#/*
// @icon         https://vms.cnpc.com.cn:9999/gps-web/favicon.ico
// @grant        none
// ==/UserScript==

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

window.inputValue = function (dom, st) {
    console.log(dom);
    var evt = new InputEvent('input', {
        inputType: 'insertText',
        data: st,
        dataTransfer: null,
        isComposing: false
    });
    dom.value = st;
    dom.dispatchEvent(evt);
}

async function solveAlarm() {
    // 获取全部报警
    var alarmLists = document.querySelector("#alarmListBox").childNodes;
    for (var i = 0; i < alarmLists.length; i++) {
        var pretext = alarmLists[i].innerText;
        var text = pretext.substring(0, pretext.search("\n"));
        console.log(text);
        if (alarmDict[text] !== undefined) {
            var msg = alarmDict[text];
            // 选择第i个报警
            alarmLists[i].click();
            await sleep(1000);
            // 全选
            document.querySelector("body > div.MainApp_container_2bJW3 > div.MainApp_header_1aQsc > div.HeaderBar_container_2sLX1 > div.HeaderBar_tool_bar_m7Ca4 > div.RealTimeAlarm_alarm_FQrU9 > div.container.RealTimeAlarmWindow_container_2Xg2L > div > div.RealTimeAlarmWindow_rightBox_2GfE8 > div:nth-child(3) > div > div > div > div > div.vxe-table--render-wrapper > div.vxe-table--fixed-wrapper > div.vxe-table--fixed-left-wrapper > div.vxe-table--header-wrapper.fixed-left--wrapper > table > thead > tr > th.vxe-header--column.col_44.col--center.col--checkbox.col--fixed.col--ellipsis > div.vxe-cell.c--tooltip > span > span").click();
            await sleep(1000);
            // 点击处理按钮
            document.querySelector("body > div.MainApp_container_2bJW3 > div.MainApp_header_1aQsc > div.HeaderBar_container_2sLX1 > div.HeaderBar_tool_bar_m7Ca4 > div.RealTimeAlarm_alarm_FQrU9 > div.container.RealTimeAlarmWindow_container_2Xg2L > div > div.RealTimeAlarmWindow_rightBox_2GfE8 > div.Toolbar_toolbar_7SMZD.Toolbar_toolbar_zero_Mw76N.RealTimeAlarmWindow_toolbar_17MsQ > div.Toolbar_left_ZORKd.Toolbar_left_zero_3EU6A > button:nth-child(6)").click();
            await sleep(2000);
            // 填写左侧消息
            var leftDom = document.querySelector("#alarmDealWindow > div > div.AlarmDealBox_body_fyic5 > div.AlarmDealBox_body_bottomBox_3WfsT > div.AlarmDealBox_body_bottomBox_main_2-luY > div:nth-child(1) > div.CmdSendText_body_2cy6w > div > div.CmdSendText_textMessageBox_2idnZ > div > div.CmdSendText_param_layout_19xQd > div > div > div > input");
            window.inputValue(leftDom, msg);
            // 填写右侧消息
            var rightDom = document.querySelector("#alarmDealWindow > div > div.AlarmDealBox_body_fyic5 > div.AlarmDealBox_body_bottomBox_3WfsT > div.AlarmDealBox_body_bottomBox_main_2-luY > div.AlarmDealBox_desBox_3IyGi > div:nth-child(2) > div.InputTextArea_container_2gCq8.InputTextArea_border_xAquO.AlarmDealBox_InputTextArea_7EoKs > div > textarea")
            window.inputValue(rightDom, msg);
            await sleep(1000);
            // 提交处理
            document.querySelector("#alarmDealWindow > div > div.AlarmDealBox_body_fyic5 > div.AlarmDealBox_body_bottomBox_3WfsT > div.AlarmDealBox_body_bottomBox_buttonBox_2nuEr > div > button:nth-child(1)").click();
            await sleep(1000);
            // 关闭窗口
            document.querySelector("#alarmDealWindow > div > div.AlarmDealBox_title_nwjjq > button").click();
            await sleep(2000);
        }
    }
}

(function () {
    'use strict';
    window.onload = function () {
        console.log('脚本已启动');
        var loop = setInterval(solveAlarm, 60000);
    };
})();