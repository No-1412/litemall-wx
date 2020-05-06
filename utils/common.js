const $ = require('./utils.js');
const config = require('../config.js');

import {
  verify,
  imageurl
} from "./service.js";

/**
 * 用户信息
 */
let userInfo = {
  wxtoken: null,
}
/**
 * 商户信息
 */
let storeInfo = {

}
/**
 * 赋值配置到全局
 */
let cf = config
/**
 * 系统信息
 */
let sysInfo = ''
let maxNumber = 10
let iPhoneX = false
// let reg = /^1[3456789]\d{9}$/ //手机号正则
let reg = /^1\d{10}$/
let regName = /^[A-Za-z\u4e00-\u9fa5]+$/ //姓名正则
let imgShf = '_w300'
let skip = '' // 登录时跳转方式用于审核
let isLogin = true
/**
 * 获取Token
 */
const getToken = (callBack) => {
  wx.login({
    success: (res) => {
      let obj = {
        code: res.code
      }
      verify(obj).then(res => {
        if (res.status == 0) {
          // 	let url = './pages/index/index';
          // 	$.allNextPage(2, url);
          userInfo.wxtoken = res.data.wxtoken
          callBack && callBack(res.data)
        } else {
          $.showToast('wxtoken出错')
        }
      })
    }
  })
}
/**
 * @desc 单文件上传数组长度为1
 * @desc 多文件上传数组长度为大于2
 * @param Array 回调
 */
const filesUpload = (filesArr, callBack) => {
  let filesLen = filesArr.length;
  let imgSrcArr = []; //存本地显示用
  let imgPathArr = []; //存我们自己服务器解析的
  let callAgru = []; //存我们自己服务器解析的，取其中一个字段
  let imgSize = maxNumber * 1024 * 1024; //单位M转Byte
  let index = 0;
  (function again(index) {
    // console.log(filesArr[index].size)
    // console.log(filesArr[index].size / (1024 * 1024))
    // console.log(imgSize)
    if (filesArr[index].size > imgSize) {
      console.log(`第${index + 1}大于${maxNumber}M`)
      $.showToast(`第${index + 1}大于${maxNumber}M`)

      imgSrcArr[index] = undefined
      imgPathArr[index] = undefined
      callAgru[index] = undefined
      if (index + 1 < filesLen) {
        index += 1
        again(index)
      } else {
        let obj = $.twoArrToEmpty([imgSrcArr, imgPathArr, callAgru])
        if (obj[0].length == 0) {
          callBack && callBack(false)
          return false
        }
        callBack && callBack(obj)
      }
    } else {
      console.log(`第${index + 1}小于${maxNumber}M`)
      imageurl(filesArr[index].path, 'file').then(data => {
        let imgPath = JSON.parse(data)
        console.log('// 我们自己服务器返回的照片路径', data, imgPath)
        if (imgPath.status == 0) {
          imgSrcArr[index] = filesArr[index].path
          imgPathArr[index] = imgPath.data[0]
          callAgru[index] = imgPathArr[index].path

          if (index + 1 < filesLen) {
            index += 1
            again(index)
          } else {
            let obj = $.twoArrToEmpty([imgSrcArr, imgPathArr, callAgru])
            if (obj[0].length == 0) {
              callBack && callBack(false)
              return false
            }
            callBack && callBack(obj)
          }
        } else if (imgPath.status == 3) {
          $.showToast(imgPath.errormsg)

          imgSrcArr[index] = undefined
          imgPathArr[index] = undefined
          callAgru[index] = undefined
          if (index + 1 < filesLen) {
            index += 1
            again(index)
          } else {
            let obj = $.twoArrToEmpty([imgSrcArr, imgPathArr, callAgru])
            if (obj[0].length == 0) {
              callBack && callBack(false)
              return false
            }
            callBack && callBack(obj)
          }
        } else {
          callBack && callBack(false)
        }
      })
    }
  })(index)
}
/**
 * @desc 单照片上传数组长度为1
 * @desc 多照片上传数组长度为大于2
 * @param Array 回调
 */
const imgUpload = (res, callBack) => {
  let filesArr = res;
  let filesLen = filesArr.length;
  let selfImgArr;
  let path = [];
  let srcPath = [];
  for (let i = 0; i < filesLen; i++) {
    imageurl(filesArr[i].path, 'file').then(data => {
      // 我们自己服务器返回的照片路径
      let imgPath = JSON.parse(data)
      if (imgPath.status == 0) {
        path.push(filesArr[i].path)
        srcPath.push(imgPath.data[0].path)
        selfImgArr = {
          path,
          srcPath,
        }
        console.log(selfImgArr)
        callBack && callBack(selfImgArr)
      } else if (imgPath.status == 3) {
        $.showToast(imgPath.errormsg)
        // callBack && callBack(false)
      } else {
        callBack && callBack(false)
      }
    })
  }
}
module.exports = {
  userInfo,
  storeInfo,
  getToken,
  filesUpload,
  imgUpload,
  cf,
  iPhoneX,
  reg,
  maxNumber,
  regName,
  imgShf,
  skip,
  isLogin
}