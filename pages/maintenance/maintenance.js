// const util = require('../../../utils/util.js')
const util = require('../../utils/util.js')
const api = require('../../config/api.js');
const utils = require('../../components/utils/utils.js');
Page({
  data: {
    hotSearch: [
      "早安D站",
      "2019退役球星",
      "卡拉斯科"
    ],
    // banner: [{
    //   img: "banner_1.jpg",
    //   title: "山东官方：德尔加多已完成全部手续办理，具备上场比赛资格"
    // }, {
    //   img: "banner_2.jpg",
    //   title: "这个世界上，或许没有真正的托黑"
    // }, {
    //   img: "banner_3.jpg",
    //   title: "金童再见！西班牙前锋托雷斯宣布退役"
    // }],
    newsList: [],
    dataSources: [{
      title: "荷兰媒体：德利赫特接近加盟尤文，转会费7000万，年薪2000万",
      source: "央视网新闻",
      img: [api.Download + "?path=D:/issueReport/images/20200507/1588823231708_156.jpg"],
      imgNum: 2
    }, {
      title: "申花客场1-0江苏终结九轮不胜，莫雷诺争议进球经VAR判罚有效",
      source: "体坛大精汇"
    }, {
      title: "卡拉斯科：俱乐部一些人的态度令我不解；需要解决出现的问题",
      source: "体坛大精汇",
      img: [api.Download + "?path=D:/issueReport/images/20200507/1588831391733_276.jpg", 
      api.Download + "?path=D:/issueReport/images/20200507/1588831393132_165.jpg", 
      api.Download + "?path=D:/issueReport/images/20200507/1588830527674_785.jpg",
      api.Download + "?path=D:/issueReport/images/20200507/1588831095556_464.jpg"
    ],
      imgNum: 3
    }],
    pageIndex: 1,
    pageSize: 20,
    loadding: false,
    pullUpOn: true
  },
  onLoad: function (options) {
    this.data.pullUpOn = true
    this.data.pageIndex = 1
    let that = this
    util.request(api.MaintenanceList, {
      pageNum: this.data.pageIndex++,
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
          newsList: that.data.dataSources,
          hotSearch: that.data.dataSources.map(o => o.title)
        })
      } else {
        wx.showToast({
          title: "暂无上报问题",
          icon: "none"
        });
      }
    })
  },
  onShow: function() {
    // wx.navigateTo({
    //   url: '/pages/auth/accountLogin/accountLogin',
    // })
  },
  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
    // this.setData({
    //   newsList: this.data.dataSources,
    //   pageIndex: 1,
    //   pullUpOn: true,
    //   loadding: false
    // })
    // this.onLoad()
    wx.reLaunch({
      url: '/pages/maintenance/maintenance',
    })
    
    let options = {
      msg: "刷新成功，为你更新了" + this.data.pageSize + "条数据",
      duration: 2000,
      type: "translucent"
    };
    setTimeout(() => {
      utils.toast(options);
      wx.stopPullDownRefresh()
    }, 300);
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
          //解构和concat修改均会失败？？
          // let arr = JSON.parse(JSON.stringify(this.data.dataSources));
          // if (this.data.pageIndex >= 1) {
          //   for (let item of arr) {
          //     item.isTop = false;
          //   }
          // }
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
        }
      })
    })
  },
  search: function () {
    wx.navigateTo({
      url: '../news-search/news-search'
    })
  },
  bannerDetail:function(){
    wx.navigateTo({
      url: '../newsDetail/newsDetail'
    })
  },
  detail(e) {
    let index = e.currentTarget.id;
    let url ="../newsDetail/newsDetail";
    if (this.data.newsList[index].isVideo){
      url = "../news-video/news-video";
    }
    wx.navigateTo({
      url: url
    })
  }
})