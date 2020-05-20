const form = require("../../components/utils/formValidation.js")
const util = require('../../utils/util.js')
const api = require('../../config/api.js');

Page({
  data: {
    items: [
      { code: '0', name: '未完成' },
      { code: '1', name: '已完成' }
    ],
    inRanges: [
      { code: '0', name: '否' },
      { code: '1', name: '是' }
    ],
    //图片地址
    imageList: [],
    //上传状态：1-上传成功 2-上传中 3-上传失败
    statusArr: [],
    limit: 9,
    url: api.Download + '?path='
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
    },{
      name: "inRange",
      rule: ["required"], //可使用区间，此处主要测试功能
      msg: ["请选择范围"]
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
    formData.capImgPaths = this.data.imageList.toString();
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
        let imagePaths = [];
        if (res.data.imgPaths) {
          imagePaths = res.data.imgPaths.split(",");
        }
        that.setData({
          detail: res.data,
          permit: permit,
          imagePaths: imagePaths
        });
      }
    });
  },
  init: function(options) {
    let imgArr = []
    let status = []
    for (let item of imgArr) {
      status.push("1")
    }
    this.setData({
      issueReportId: options.id,
      imageList: [...imgArr],
      statusArr: status
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
  },
  change() {
    let status = ~this.data.statusArr.indexOf("2") ? 2 : 1
    if (status != 2 && ~this.data.statusArr.indexOf("3")) {
      // 上传失败
      status = 3
    }
    this.triggerEvent('complete', {
      status: status,
      imgArr: this.data.imageList
    })
  },
  chooseImage: function() {
    let _this = this;
    wx.chooseImage({
      count: _this.data.limit - _this.data.imageList.length,
      success: function(e) {
        let imageArr = [];
        let status = []
        for (let i = 0; i < e.tempFilePaths.length; i++) {
          let len = _this.data.imageList.length;
          if (len >= _this.data.limit) {
            wx.showToast({
              title: `最多可上传${_this.data.limit}张图片`,
              icon: "none"
            });
            break;
          }
          let path = e.tempFilePaths[i]
          imageArr.push(path)
          status.push("2")
        }
        _this.setData({
          imageList: _this.data.imageList.concat(imageArr),
          statusArr: _this.data.statusArr.concat(status)
        })
        _this.change()

        let start = _this.data.imageList.length - imageArr.length
        for (let j = 0; j < imageArr.length; j++) {
          let index = start + j
          //服务器地址
          if (api.Upload) {
            _this.uploadImage(index, imageArr[j]).then(() => {
              _this.change()
            }).catch(() => {
              _this.change()
            })
          } else {
            //无服务器地址则直接返回成功
            let value = `statusArr[${index}]`
            _this.setData({
              [value]: "1"
            })
            _this.change()
          }
        }
      }
    })
  },
  uploadImage: function(index, url) {
    let _this = this;
    let status = `statusArr[${index}]`;
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: api.Upload,
        name: 'file',
        // header: {
          //设置请求头
        // },
        formData: {},
        filePath: url,
        success: function(res) {
          if (res.statusCode == 200) {
            //返回结果 此处需要按接口实际返回进行修改
            let d = JSON.parse(res.data.replace(/\ufeff/g, "") || "{}")
            //判断code，以实际接口规范判断
            if (d.code % 100 === 0) {
              // 上传成功 d.url 为上传后图片地址，以实际接口返回为准
              if (d.data) {
                let value = `imageList[${index}]`
                _this.setData({
                  [value]: d.data
                })
              }
              _this.setData({
                [status]: d.data ? "1" : "3"
              })
            } else {
              // 上传失败
              _this.setData({
                [status]: "3"
              })
            }
            resolve(index)
          } else {
            _this.setData({
              [status]: "3"
            })
            reject(index)
          }
        },
        fail: function(res) {
          _this.setData({
            [status]: "3"
          })
          reject(index)
        }
      })
    })

  },
  delImage: function(e) {
    let index = Number(e.currentTarget.dataset.index)

    let imgList = [...this.data.imageList]
    let status = [...this.data.statusArr]
    imgList.splice(index, 1)
    status.splice(index, 1)
    this.setData({
      imageList: imgList,
      statusArr: status
    })
    this.triggerEvent("remove", {
      index: index
    })
    this.change()
  },
  previewImage: function(e) {
    let index = Number(e.currentTarget.dataset.index)
    if (!this.data.imageList.length) return;
    wx.previewImage({
      current: this.data.imageList[index],
      loop: true,
      urls: this.data.imageList
    })
  }
})