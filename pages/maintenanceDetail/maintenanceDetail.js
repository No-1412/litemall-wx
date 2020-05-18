const form = require("../../components/utils/formValidation.js")
const util = require('../../utils/util.js')
const api = require('../../config/api.js');

Page({
  data: {
    items: [
      { code: '0', name: '未完成' },
      { code: '1', name: '已完成'}
    ],
  },
  onLoad: function(options) {
    this.init(options);
  },
  formSubmit: function(e) {
    //表单规则
    let rules = [{
      name: "oprationStadus",
      rule: ["required"], //可使用区间，此处主要测试功能
      msg: ["请选择维保状态"]
    }];
    //进行表单检查
    let formData = e.detail.value;
    let checkRes = form.validation(formData, rules);
    if (checkRes) {
      wx.showToast({
        title: checkRes,
        icon: "none"
      });
      return;
    }

    // 记录类型为反馈
    // formData.recordType = 1;
    formData.issueReportId = this.data.issueReportId;
    util.request(api.MaintenanceFlowAdd, formData, "POST").then(function (res) {
      if (res.code == 0) {
        wx.showToast({
          title: "巡检问题反馈成功",
          icon: "none"
        });
        setTimeout(() => wx.navigateBack(), 1000);
      } else {
        wx.showToast({
          title: res.msg,
          icon: "none"
        });
      }
    });
  },
  formReset: function(e) {
    console.log("清空数据")
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  getDetail: function (id) {
    let that = this;
    util.request(api.MaintenanceDetail, {issueReportId: id}).then(function(res) {
      if (res.code === 0) {
        let permit = false;
        if (res.data.candidateIds) {
          const user = wx.getStorageSync('userInfo');
          if (res.data.candidateIds.indexOf(user.username) > -1) 
            permit = true;
        }
        let info = res.data;
        if (res.data.warnContent) {
          try {
            let warnContent = JSON.parse(info.warnContent);
            if (typeof warnContent == "object") {
              let deviceType = warnContent.deviceType;
              let realValue = warnContent.realValue ? warnContent.realValue : "空";
              let field = warnContent.field;
              let monitorNumericalValue = warnContent.monitorNumericalValue;
              let name = warnContent.name;
              let operator = warnContent.operator;
              info.warnContent = `${deviceType}:${name},字段:${field}=${realValue},不${operator}预警值:${monitorNumericalValue}`;
            }
          } catch(e) {
          }
        }
        that.setData({
          detail: res.data,
          permit: permit
        });
      }
    });
  },
  init: function(options) {
    this.setData({
      issueReportId: options.id
    })
    this.getDetail(options.id)
  },
  sign: function() {
    // 记录类型为反馈
    // formData.recordType = 1;
    util.request(api.MaintenanceFlowSign, {issueReportId: this.data.issueReportId}, "POST").then(function (res) {
      if (res.code == 0) {
        wx.showToast({
          title: "巡检问题签收成功",
          icon: "none"
        });
        setTimeout(() => wx.navigateBack(), 1000);
      } else {
        wx.showToast({
          title: res.msg,
          icon: "none"
        });
      }
    });
  }
})