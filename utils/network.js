let $ = require('./utils.js')
/**
 * Created by 23hp on 2018/3/30.
 * 基于Promise的网络请求库,包含GET POST请求，上传下载功能
 * 使用方法：
 * 先引入： import {get,post,...} from 本文件;
 * · get请求:    get("/index",{id:2}).then(data=>{}).catch(error=>{});
 * · post请求:    post("/index",{id:2}).then(data=>{}).catch(error=>{});
 * Promise详细介绍：
 * http://es6.ruanyifeng.com/#docs/promise
 */
/**
 * 发起get请求
 * @param url 请求路径 必填
 * @param data 请求参数 get请求的参数会自动拼到地址后面
 * @param headers 请求头 选填
 * @returns {Promise}
 */
const get = (url, data, headers) => request('GET', url, data, headers);

/**
 * 发起post请求
 * @param url 请求路径 必填
 * @param data 请求参数
 * @param headers 请求头 选填
 * @returns {Promise}
 */
const post = (url, data, headers) => request('POST', url, data, headers);
/**
 * 发起put请求
 * @param url 请求路径 必填
 * @param data 请求参数
 * @param headers 请求头 选填
 * @returns {Promise}
 */
const put = (url, data, headers) => request('PUT', url, data, headers);
/**
 * 发起delete请求
 * @param url 请求路径 必填
 * @param data 请求参数 delete请求的参数会自动拼到地址后面
 * @param headers 请求头 选填
 * @returns {Promise}
 */
const del = (url, data, headers) => request('DELETE', url, data, headers);

/**
 * 接口请求基类方法
 * @param method 请求方法 必填
 * @param url 请求路径 必填
 * @param data 请求参数
 * @param header 请求头 选填
 * @returns {Promise}
 */
function request(method, url, data, header) {
  let wxtoken = global.userInfo.wxtoken
  // console.log('network-【request】', wxtoken)

  if (method == 'POST' || method == 'PUT') {
    header = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'wxtoken': wxtoken
    }
  } else {
    header = {
      'Content-Type': 'application/json;charset=UTF-8',
      'wxtoken': wxtoken
    }
  }
  return new Promise((resolve, reject) => {
    $.load()
    const response = {};
    wx.request({
      url,
      method,
      data,
      header,
      success: (res) => response.success = res.data,
      fail: (error) => response.fail = error,
      complete() {
        // console.group('==============>请求开始<==============');
        // console.info('请求方法，路径', method, url);
        // console.info('请求参数-data', data);
        let obj = {
          '请求方法': method,
          '路径': url,
          '请求参数-data': data
        }
        wx.hideLoading()
        if (response.success) {
          // global.skip = response.success.data && response.success.data.skip
          if (response.success.status == 6) {
            global.isLogin = false
          } else {
            global.isLogin = true
          }
          // console.info('request请求成功', response.success);
          // console.info('request成功请求方式', obj);
          if (response.success.status == 1) {
            global.getToken(res => {
              request(method, url, data).then(data => {
                // console.log('response.success.status == 1;未登录或登录过期', data)
                resolve(data)
              })
            })
          } else if (response.success.status == 0) {
            // console.log('response.success.status == 0;正常', response.success)
            resolve(response.success)
          } else if (response.success.status == 3) {
            console.log('response.success.status == 3;其他错误', response.success)
            resolve(response.success)
          } else if (response.success.status == 6) {
            console.log('response.success.status == 6;未绑定手机号', response.success)
            // resolve(response.success)
            if (!$.isNull(global.skip)) {
              let url = '/pages/login/login'
              $.allNextPage(global.skip || 4, url)
            }
            $.showToast(response.success.errormsg)
          } else if (response.success.status == 8) {
            console.log('response.success.status == 8;账号冻结', response.success)
            // resolve(response.success)
            let url = '/pages/login/login'
            $.allNextPage(2, url)
            $.showToast(response.success.errormsg)
          } else {
            console.info('response.success请求错误', response.success)
          }
        } else {
          // console.info('request请求失败', response.fail);
          console.info('request失败请求方式', obj);
          reject(response.fail)
        }
        // console.info('==============>请求结束<==============');
        // console.groupEnd();
      },
    });
  });
}
/**
 * 没有loading框的请求
 */
function noLoad(method, url, data, responseType = 'text', header) {
  let wxtoken = global.userInfo.wxtoken
  // console.log('network-【noLoad】', wxtoken)

  if (method == 'POST' || method == 'PUT') {
    header = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'wxtoken': wxtoken
    }
  } else {
    header = {
      'Content-Type': 'application/json;charset=UTF-8',
      'wxtoken': wxtoken
    }
  }
  return new Promise((resolve, reject) => {
    const response = {};
    wx.request({
      url,
      method,
      data,
      header,
      responseType,
      success: (res) => response.success = res.data,
      fail: (error) => response.fail = error,
      complete() {
        // console.group('==============>请求开始<==============');
        let obj = {
          '请求方法': method,
          '路径': url,
          '请求参数-data': data
        }
        if (response.success) {
          // console.info('noLoad请求成功', response.success);
          // console.info('noLoad成功请求方式', obj);

          resolve(response.success)
        } else {
          // console.info('noLoad请求失败', response.fail);
          console.info('noLoad失败请求方式', obj);
          reject(response.fail)
        }
        // console.info('==============>请求结束<==============');
      },
    });
  });
}
/**
 * 上传
 */
function upLoad(url, filePath, name) {
  return new Promise((resolve, reject) => {
    // $.load('上传中...')
    const response = {};
    wx.uploadFile({
      url,
      filePath,
      name,
      header: {
        "Content-Type": "multipart/form-data"
      },
      formData: {
        user: 'test'
      },
      success: (res) => response.success = res.data,
      fail: (error) => response.fail = error,
      complete() {
        // console.group('==============>请求开始<==============');
        let obj = {
          '路径': url,
          '文件路径': filePath,
          '请求文件名-name': name
        }
        wx.hideLoading()
        if (response.success) {
          // console.info('upLoad请求成功', response.success);
          // console.info('upLoad成功请求方式', obj);

          resolve(response.success)
        } else {
          // console.info('upLoad请求失败', response.fail);
          console.info('upLoad失败请求方式', obj);
          reject(response.fail)
        }
        // console.info('==============>请求结束<==============');
      },
    }).onProgressUpdate((res) => {
      if (res.progress == 100) {
        wx.hideLoading()
        $.load('加载中...')
      } else {
        $.load(`上传进度${res.progress}%`)
      }
      // console.log('上传进度', res)
      // console.log('已经上传的数据长度', res.totalBytesSent)
      // console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
    })
  });
}

export {
  get,
  post,
  put,
  request,
  noLoad,
  upLoad
}