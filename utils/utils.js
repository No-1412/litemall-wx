// 秒转化时间格式
function secondToTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  let hour = parseInt(time / 3600)
  time = time % 3600
  let minute = parseInt(time / 60)
  time = time % 60
  let second = time

  return ([hour, minute, second]).map(function(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}
/**
 * 显示模态对话框-没有取消按钮
 * 参数1 title为提示内容 必填项
 */
const nCancelModal = (content, callback, confirmText, confirmColor) => {
  wx.showModal({
    title: '提示',
    content: content || '是否确认？',
    showCancel: false,
    confirmText: confirmText || '确定',
    confirmColor: confirmColor || '#FFAE12',
    success: () => {},
    fail: () => {},
    complete: callback
  })
}
/**
 * 显示模态对话框-有取消按钮
 * 参数1 title为提示内容 必填项
 * 参数2 回调 obj
 * 参数3 确定按钮上的文字
 * 参数4 取消按钮上的文字
 * 参数5 确定按钮上的文字的颜色
 * 参数6 取消按钮上的文字的颜色
 */
const yCancelModal = (content, callback, confirmText, cancelText, confirmColor, cancelColor) => {
  wx.showModal({
    title: '提示',
    content: content || '是否确认？',
    showCancel: true,
    confirmText: confirmText || '确定',
    confirmColor: confirmColor || '#FFAE12',
    cancelText: cancelText || '取消',
    cancelColor: cancelColor || '#999',
    success: () => {},
    fail: () => {},
    complete: callback
  })
}
/**
 * 显示消息提示框
 * 参数1 title为提示内容 必填项
 * icon为照片路径时 用照片显示
 * 使用方式
 * let icon = './images/logo.png';
 * $.showToast('加载中', icon);
 */
const showToast = (title, icon = 'none', duration = 1500, callback) => {
  if (icon == 'success' || icon == 'loading' || icon == 'none') {
    wx.showToast({
      title: title,
      icon: icon,
      duration: duration,
      mask: true,
      success: callback,
      fail: callback,
    })
  } else {
    wx.showToast({
      title: title,
      image: icon,
      duration: duration,
      mask: true,
      success: callback,
      fail: callback,
    })
  }
}
/**
 * 显示load加载框
 */
const load = (title = '加载中...', mask = false) => {
  wx.showLoading({
    title,
    mask,
  })
}
/**
 * 获取data值
 */
const daSet = (data) => {
  return data.currentTarget.dataset;
}

/**
 * 检查数据否为假
 */
const isNull = (res) => {
  return res === null || res === undefined || res === 'undefined' || res === '';
}
/**
 * 检查对象是否为空
 */
const objIsNull = (obj) => {
  for (let key in obj) {
    return false;
  }
  return true;
}
/**
 * 检查对象是否包含某个属性
 */
const isHasPro = (res, property) => {
  return res.hasOwnProperty(property);
}
/**
 * 对象转Json
 */
const jStr = (res) => {
  return JSON.stringify(res);
}
/**
 * Json转对象
 */
const jPa = (res) => {
  return JSON.parse(res);
}
/**
 * 简化console.log
 */
const l = (...log) => {
  console.log(...log);
}
/**
 * @desc 打开预览照片
 * @param urls Array 待检测的数组 current String
 */
const previewImg = (urls, current, callback) => {
  wx.previewImage({
    urls: urls || [],
    current, // 当前显示照片的http链接
    complete: callback,
  })
}
/**
 * 普通跳转下一页
 */
const nextPage = (res, callback) => {
  wx.navigateTo({
    url: res,
    success: callback,
    fail: function(res) {},
    complete: function(res) {},
  })
}

/**
 * 所有跳转下一页集合
 */
const allNextPage = (code, url, callback) => {
  code = code || 4
  if (code == 1) {
    // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
    wx.switchTab({
      url: url,
      success: function(res) {},
      fail: function(res) {},
      complete: callback,
    })
  } else if (code == 2) {
    // 关闭所有页面，打开到应用内的某个页面
    wx.reLaunch({
      url: url,
      success: function(res) {},
      fail: function(res) {},
      complete: callback,
    })
  } else if (code == 3) {
    // 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。
    wx.redirectTo({
      url: url,
      success: function(res) {},
      fail: function(res) {},
      complete: callback,
    })
  } else if (code == 4) {
    // 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面
    wx.navigateTo({
      url: url,
      success: function(res) {},
      fail: function(res) {},
      complete: callback,
    })
  } else if (code == 5) {
    // 关闭当前页面，返回上一页面或多级页面
    wx.navigateBack({
      delta: url || 1,
      success: function(res) {},
      fail: function(res) {},
      complete: callback,
    })
  }
}
/**
 * 设置缓存
 */
const setStorage = (key, value, isSync = false) => {
  if (isSync) {
    wx.setStorageSync({
      key: key,
      data: value
    })
  } else {
    wx.setStorage({
      key: key,
      data: value
    })
  }
}
/**
 * 取出缓存
 */
const getStorage = (key, callback, isSync = false) => {
  try {
    const value = isSync ? wx.getStorageSync(key) : wx.getStorage(key);
    if (value) {
      let obj = {
        Code: 0,
        Info: value,
        Msg: '取缓存操作成功'
      }
      callback && callback(obj)
    }
  } catch (e) {
    let obj = {
      Code: -1,
      Info: e,
      Msg: '取缓存操作失败'
    }
    callback && callback(obj)
  }
}
/**
 * @desc 拍照业务
 * @callback 回调 count 照片数量 quality 照片是否压缩 original(原图) compressed(压缩图)
 * return {Obj} 类型对象
 */
const takePicture = (callback, count = 1, quality = 'compressed') => {
  wx.chooseImage({
    count,
    sizeType: [quality],
    sourceType: ['camera', 'album'],
    success: () => {},
    fail: () => {},
    complete: (res) => {
      if (res.errMsg == "chooseImage:ok") {
        callback && callback(res)
      } else {
        showToast('拍照失败，请重试！')
      }
    }
  })
}
/**
 * @desc 数据类型检测
 * @param obj 待检测的数据
 * @return {String} 类型字符串
 */
const isType = (obj) => {
  // console.log(typeof obj !== "object" ? typeof obj : Object.prototype.toString.call(obj).slice(8, -1).toLowerCase());
  return typeof obj !== "object" ? typeof obj : Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}
/**
 * url参数 对象转字符串
 */
const obj = (...a) => {
  let obj = {
    Info: {
      ...a
    }[0],
    Msg: {
      ...a
    }[1],
    Code: {
      ...a
    }[2] || 0,
  }
  return JSON.stringify(obj)
}
/**
 * 加前缀0
 */
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 时间戳转时间格式【2019-05-06】
 */
const unixTodate = (res) => {
  let time = new Date(parseInt(res));
  let y = time.getFullYear();
  let m = time.getMonth() + 1;
  let d = time.getDate();
  return `${y}-${formatNumber(m)}-${formatNumber(d)}`
}
/** 
 * 时间戳转化为年 月 日 时 分 秒【2019-05-06 13:34:47】
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
 */
const formatTime = (number, format = 'Y-M-D h:m:s') => {
  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(parseInt(number || new Date().getTime()));
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}
/**
 * 自定义年月日
 */
const getDate = () => {
  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth() + 1;
  let day = d.getDate();
  return `${year}-${formatNumber(month)}-${formatNumber(day)}`
}
/**
 * 自定义年月
 */
const getMonth = () => {
  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth() + 1;
  return `${year}-${formatNumber(month)}`
}
/**
 * 时间格式转时间戳
 */
const dateTounix = (res) => {
  return (new Date(res).getTime())
}
/**
 * 获取当前时间戳
 */
const getUnix = () => {
  return new Date().getTime()
}
/**
 * desc 一维数组去空
 */
const arrToEmpty = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (isNull(arr[i])) {
      arr.splice(i, 1);
      i = i - 1;
    }
  }
  return arr;
}
/**
 * desc 二维数组去空
 */
const twoArrToEmpty = (arr) => {
  let resArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (isNull(arr[i])) {
      arr.splice(i, 1)
      i = i - 1
      // console.log(arr)
    } else {
      resArr[i] = arr[i];
      for (let j = 0; j < resArr[i].length; j++) {
        resArr[i][j] = arr[i][j]
        if (isNull(resArr[i][j])) {
          resArr[i].splice(j, 1);
          j = j - 1;
          // console.log(resArr[i])
        }
      }
    }
  }
  return resArr
}
/**
 * desc 把对象里的某个属性值JSON字段转换成Obj或Array
 */
const strToObj = (obj) => {
  if (isType(obj) == 'object') {
    let result = new Object();
    for (let prop in obj) {
      if (isType(obj[prop]) == 'string') {
        if (obj[prop] > 10000) {
          result[prop] = obj[prop];
        } else {
          try {
            result[prop] = JSON.parse(obj[prop]);
          } catch (e) {
            result[prop] = obj[prop];
            // console.error(prop, '该String字段转换对象或数组失败,请检查该对象！');
          }
        }
      } else {
        result[prop] = obj[prop]
      }
    }
    return result
  } else {
    console.error('strToObj-不是对象！请检查');
    return false;
  }
}
/**
 * desc 把数组里的某个对象的属性值JSON字段转换成Obj或Array
 */
const strToArr = (arr) => {
  if (isType(arr) == 'array') {
    arr.map((curVal, index, value) => {
      value[index] = strToObj(curVal)
    })
    return arr;
  } else {
    console.error('strToArr-不是数组！请检查');
    return false;
  }
}
/**
 * str转All
 */
const strToAll = (args) => {
  if (isType(args) == 'array') {
    return strToArr(args)
  } else if (isType(args) == 'object') {
    return strToObj(args)
  } else {
    console.error('strToAll-不是数组也不是对象！请检查');
    return false
  }
}
/**
 * desc 把对象里的某个属性的值不是String字段转换成String
 */
const objToStr = (obj) => {
  if (isType(obj) == 'string') {
    return obj
  } else if (isType(obj) == 'object') {
    let result = new Object();
    for (let prop in obj) {
      // console.log(isType(obj[prop]))
      if (isType(obj[prop]) != 'string' && isType(obj[prop]) != 'number') {
        try {
          result[prop] = JSON.stringify(obj[prop]);
        } catch (e) {
          result[prop] = obj[prop];
          // console.error(prop, '该String字段转换对象或数组失败,请检查该对象！');
        }
      } else {
        result[prop] = obj[prop]
      }
    }
    return result
  } else {
    console.error('objToStr-不是字符串也不是对象！请检查');
    return false;
  }
}
/**
 * desc 照片拼后缀
 */
const addSuf = (res) => {
  let resArr = res.split(".")
  return `${resArr[0]}${global.imgShf}.${resArr[1]}`
}

/**
 * 金额输入
 */
let returnVal = "";
const moneyInp = (value, callback) => {
	const moneyReg = /^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/g; // 可匹配0，0.00~9999999999.99
	const isReg = moneyReg.test(value);

	if (isNull(value)) {
		returnVal = "";
		callback && callback(returnVal);
		return false;
	}
	if (isReg) {
		returnVal = value;
		callback && callback(returnVal);
	} else {
		returnVal = returnVal || "";
		callback && callback(returnVal);
	}
	// console.log(`金额正则:isReg:${isReg};value:${value};returnVal:${returnVal}`);
	// return;
	// // let value = res.detail.value;
	// // console.log('金额', value)
	// // 查找小数点 前 的正则匹配
	// const regBefore = /[^\d.]/g;
	// const isRegBefore = regBefore.test(value);
	// // 查找小数点 后 的正则匹配
	// const regAfter = /^[0-9]+(.[0-9]{0,2})?$/g;
	// const isRegAfter = regAfter.test(value);

	// // console.log('查找小数点 前 的正则匹配', isRegBefore)
	// // console.log('查找小数点 后 的正则匹配', isRegAfter)
	// if (!isRegBefore && (isRegAfter || isNull(value))) {
	// 	returnVal = value;
	// 	callback && callback(returnVal);
	// } else {
	// 	returnVal = returnVal || "";
	// 	callback && callback(returnVal);
	// }
};

/**
 * 处理结果
 */
const callRes = (res, callback) => {
  const {
    status,
    data,
    errormsg
  } = res;
  if (status === 0) {
    callback && callback(data);
  } else if (status === 3) {
    showToast(errormsg);
  }
};
/**
 * 获取code
 */
const getCode = callback => {

}
module.exports = {
  daSet,
  isNull,
  objIsNull,
  isHasPro,
  jStr,
  jPa,
  l,
  previewImg,
  nextPage,
  allNextPage,
  setStorage,
  getStorage,
  showToast,
  load,
  isType,
  takePicture,
  getUnix,
  formatTime,
  dateTounix,
  unixTodate,
  secondToTime,
  obj,
  getDate,
  arrToEmpty,
  twoArrToEmpty,
  strToObj,
  strToArr,
  strToAll,
  objToStr,
  getMonth,
  addSuf,
  nCancelModal,
  yCancelModal,
  moneyInp,
  getCode,
  callRes
}