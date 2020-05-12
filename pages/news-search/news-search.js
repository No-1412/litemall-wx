const utils = require('../../utils/common/util.js')
const util = require('../../utils/util.js')
const api = require('../../config/api.js');
Page({
  data: {
    history: [
      "美洲杯",
      "D站观点",
      "C罗",
      "早安D站",
      "2019退役球星",
      "女神大会",
      "德利赫特",
      "托雷斯",
      "自热火锅",
      "华为手机",
      "有机酸奶"
    ],
    hot: [
      "德利赫特",
      "托雷斯",
      "早安D站",
      "D站观点",
      "德利赫特",
      "美洲杯",
      "华为手机",
      "C罗",
      "自热火锅",
      "2019退役球星",
      "女神大会"
    ],
    key: "",
    showActionSheet: false,
    tips: "确认清空搜索历史吗？",

    newsList: [],
    dataSources: [],
    pageIndex: 1,
    pageSize: 20,
    loadding: false,
    pullUpOn: true,
    searchStatus: true
  },
  onLoad: function(options) {
    let that = this;
    util.request(api.MaintenanceList, {
      pageNum: this.data.pageIndex,
      pageSize: this.data.pageSize
    }).then(function (res) {
      if (res.code != 0) {
        wx.showToast({
          title: "系统异常",
          icon: "none"
        });
        return;
      }
      if (res.data.data.length > 0) {
        that.data.dataSources = res.data.data
        that.setData({
          hot: that.data.dataSources.map(o => o.title)
        })
      }
    })
  },
  back: function() {
    wx.navigateBack();
  },
  input: function(e) {
    let key = utils.trim(e.detail.value);
    this.setData({
      key: key
    })
  },
  cleanKey: function() {
    this.setData({
      key: ''
    });
  },
  closeActionSheet: function() {
    this.setData({
      showActionSheet: false
    })
  },
  openActionSheet: function() {
    this.setData({
      showActionSheet:true
    })
  },
  itemClick: function(e) {
    let index = e.detail.index;
    if (index == 0) {
      this.setData({
        showActionSheet: false,
        history: []
      })
    }
  },
  onKeywordConfirm(event) {
    this.setData({
      newsList: [],
      searchStatus: false
    })
    this.getSearchResult(event.detail.value);
  },
  inputFocus: function() {
    this.setData({
      searchStatus: true,
      newsList: []
    });
  },
  onKeywordTap: function(event) {
    const keyword = event._relatedInfo.anchorTargetText;
    this.setData({
      newsList: [],
      searchStatus: false,
      key: keyword
    })
    this.getSearchResult(keyword);
  },
  getSearchResult(keyword) {
    // if (keyword === '') {
    //   keyword = this.data.defaultKeyword.keyword;
    // }
    // this.setData({
    //   keyword: keyword,
    //   page: 1,
    //   categoryId: 0,
    //   goodsList: []
    // });
    // this.getGoodsList();

    this.data.pullUpOn = true
    this.data.pageIndex = 1
    let that = this
    util.request(api.MaintenanceList, {
      pageNum: this.data.pageIndex++,
      pageSize: this.data.pageSize,
      keywords: keyword
    }).then(function (res) {
      if (res.code != 0) {
        wx.showToast({
          title: "系统异常",
          icon: "none"
        });
        return;
      }
      if (res.data.data.length > 0) {
        that.data.dataSources = res.data.data
        that.setData({
          newsList: that.data.dataSources
        })
      } else {
        wx.showToast({
          title: "无查询结果",
          icon: "none"
        });
      }
    })
  },
  // 页面上拉触底事件的处理函数
  onReachBottom: function () {
    if (!this.data.pullUpOn) return;
    this.setData({
      loadding: true
    }, () => {
      let that = this
      util.request(api.MaintenanceList, {
        pageNum: this.data.pageIndex,
        pageSize: this.data.pageSize,
        title: this.data.key
      }).then(function (res) {
        if (res.code != 0) {
          wx.showToast({
            title: "系统异常",
            icon: "none"
          });
          return;
        }
        if (res.data.data.length > 0) {
          that.data.dataSources = res.data.data
          that.setData({
            newsList: that.data.newsList.concat(that.data.dataSources),
            pageIndex: that.data.pageIndex + 1,
            loadding: false
          })
        } else {
          that.setData({
            loadding: false,
            pullUpOn: false
          })
          wx.showToast({
            title: "已经到底了",
            icon: "none"
          });
        }
      })
    })
  }
})