const form = require("../../components/utils/formValidation.js")
const util = require('../../utils/util.js')
const api = require('../../config/api.js');

Page({
  data: {
    files: [], //最多上传9张图片
    items: [
      { code: 'USA', name: '美国' },
      { code: 'CHN', name: '中国', checked: 'true' },
      { code: 'BRA', name: '巴西' },
      { code: 'JPN', name: '日本' },
      { code: 'ENG', name: '英国' },
      { code: 'FRA', name: '法国' }, 
    ],
    warnLevels: [],
    //图片地址
    imageList: [],
    //上传状态：1-上传成功 2-上传中 3-上传失败
    statusArr: [],
    limit: 9,
    url: api.Download + '?path='
  },
  onLoad: function(options) {
    console.log(222222222222222);
    console.log(options.id);
    this.init();
  },
  formSubmit: function(e) {
    //表单规则
    let rules = [{
      name: "title",
      rule: ["required"], //可使用区间，此处主要测试功能
      msg: ["请输入问题标题"]
    },{
      name: "origin",
      rule: ["required"], //可使用区间，此处主要测试功能
      msg: ["请输入问题来源"]
    },{
      name: "deviceType",
      rule: ["required"], //可使用区间，此处主要测试功能
      msg: ["请选择设备类型"]
    },{
      name: "deviceName",
      rule: ["required"], //可使用区间，此处主要测试功能
      msg: ["请输入设备名称"]
    }];
    // let rules = [{
    //   name: "name",
    //   rule: ["required", "isChinese", "minLength:2", "maxLength:6"], //可使用区间，此处主要测试功能
    //   msg: ["请输入姓名", "姓名必须全部为中文", "姓名必须2个或以上字符", "姓名不能超过6个字符"]
    // }, {
    //   name: "sex",
    //   rule: ["required"],
    //   msg: ["请选择性别"]
    // }, {
    //   name: "age",
    //   rule: ["required", "isNum", "range:[0,150]"],
    //   msg: ["请输入年龄", "请输入正确的年龄", "请输入正确的年龄范围：0-150"]
    // }, {
    //   name: "mobile",
    //   rule: ["required", "isMobile"],
    //   msg: ["请输入手机号", "请输入正确的手机号"]
    // }, {
    //   name: "email",
    //   rule: ["required", "isEmail"],
    //   msg: ["请输入邮箱", "请输入正确的邮箱"]
    // }, {
    //   name: "idcard",
    //   rule: ["required", "isIdCard"],
    //   msg: ["请输入身份证号码", "请输入正确的身份证号码"]
    // }, {
    //   name: "pwd",
    //   rule: ["required", "isEnAndNo"],
    //   msg: ["请输入密码", "密码为8~20位数字和字母组合"]
    // }, {
    //   name: "pwd2",
    //   rule: ["required", "isSame:pwd"],
    //   msg: ["请输入确认密码", "两次输入的密码不一致"]
    // }, {
    //   name: "range",
    //   rule: ["required", "range:[3,20]"],
    //   msg: ["请输入区间数字", "请输入3-20之间的数字"]
    // }, {
    //   name: "amount",
    //   rule: ["required", "isAmount"],
    //   msg: ["请输入金额", "请输入正确的金额，允许保留两位小数"]
    // }];
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
    // if (!checkRes) {
    //   wx.showToast({
    //     title: "验证通过!",
    //     icon: "none"
    //   });
    // } else {
    //   wx.showToast({
    //     title: checkRes,
    //     icon: "none"
    //   });
    // }
    // if(this.data.files.length === 0) {
    //   wx.showToast({
    //     title: '请选择图片',
    //     icon: "none"
    //   });
    // }

    let that = this;
    formData.imgPaths = that.data.imageList.toString();
    util.request(api.MaintenanceAdd, formData, "POST").then(function (res) {
      if (res.code == 0) {
        wx.showToast({
          title: "巡检问题上报成功",
          icon: "none"
        });
        that.onLoad();
      } else {
        wx.showToast({
          title: res.msg,
          icon: "none"
        });
      }
      // that.setData({
      //   goodsCount: res.data
      // });
    });
  },
  formReset: function(e) {
    console.log("清空数据")
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  getDeviceType: function () {
    let that = this;
    util.request(api.DeviceType).then(function(res) {
      if (res.code === 0) {
        that.setData({ 
          items: res.data,
        });
      }
    });
  },
  getWarnLevel: function () {
    let that = this;
    util.request(api.WarnLevel).then(function(res) {
      if (res.code === 0) {
        that.setData({
          warnLevels: res.data,
        });
      }
    });
  },
  init: function() {
    this.getDeviceType();
    this.getWarnLevel();
    let imgArr = []
    let status = []
    for (let item of imgArr) {
      status.push("1")
    }
    this.setData({
      imageList: [...imgArr],
      statusArr: status
    })
  },

  // chooseImage: function (e) {
  //   let that = this;
  //   if (that.data.files.length >= 9) {
  //     util.toast("最多上传9张图片");
  //     return
  //   }
  //   wx.chooseImage({
  //     count: 9 - that.data.files.length,
  //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  //     success: function (res) {
  //       // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
  //       that.setData({
  //         files: that.data.files.concat(res.tempFilePaths)
  //       });
  //       //上传功能已去除
  //       //...
  //     }
  //   })
  // },
  // previewImage: function (e) {
  //   wx.previewImage({
  //     current: e.currentTarget.id, // 当前显示图片的http链接
  //     urls: this.data.files // 需要预览的图片http链接列表
  //   })
  // },
  // deleteImage: function (e) {
  //   const index = e.currentTarget.dataset.index;
  //   let arr = this.data.files;
  //   arr.splice(index, 1)
  //   this.setData({
  //     files: arr
  //   });
  // }
  // 重新上传
  reUpLoad(e) {
    let index = Number(e.currentTarget.dataset.index)
    let value = `statusArr[${index}]`
    this.setData({
      [value]: "2"
    })
    this.change()
    this.uploadImage(index, this.data.imageList[index]).then(() => {
      this.change()
    }).catch(() => {
      this.change()
    })
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