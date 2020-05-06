/**
 * 此文件管理项目所有接口
 */
import {
  get,
  post,
  put,
  del,
  noLoad,
  upLoad
} from './network';
/**
 * 收集formId
 */
// export const saveFormId = (args) => post(`${global.cf.configUrl}/wechat/saveFormId`, args);
export const saveFormId = (args) => noLoad('POST', `${global.cf.configUrl}/wechat/saveFormId`, args);
/**
 * 1:传给后台code校验是否有绑定手机号并获取wxToken
 */
export const verify = (args) => noLoad('GET', `${global.cf.configUrl}/wechat`, args);
/**
 * 15:获取照片上传路径
 */
export const imageurl = (filePath, name) => upLoad(`${global.cf.uploadUrl}`, filePath, name);
/**
 * 16:获取照片上传路径和前缀
 */
export const imgPre = () => get(`${global.cf.configUrl}/public/imageurl`);
/**
 * 验证用户输入的手机号码是否被冻结
 */
export const users = (args) => get(`${global.cf.configUrl}/users/${args}`);
/**
 * 获取验证码
 */
export const smscode = (args) => get(`${global.cf.configUrl}/public/smscode/${args}`);
/**
 * 查询用户注册店铺状态
 */
export const business = (args) => get(`${global.cf.configUrl}/business/bindBusiness`, args);
/**
 * 2:登录、注册（统一登录注册，短信验证）
 */
export const login = (args) => post(`${global.cf.configUrl}/users/login`, args);
/**
 * 5:添加合伙人
 */
export const partners = (args) => post(`${global.cf.configUrl}/business/partners`, args);
/**
 * 6:获取所有分类信息
 */
export const tradesort = (args) => get(`${global.cf.configUrl}/business/tradeSort`, args);
/**
 * 7:添加店铺信息
 */
export const addBusiness = (args) => post(`${global.cf.configUrl}/business`, args);
/**
 * 9,添加店主信息
 */
export const shopkeepers = (args) => post(`${global.cf.configUrl}/business/shopkeepers`, args);
/**
 * 10,添加银行账户信息
 */
export const accounts = (args) => post(`${global.cf.configUrl}/business/accounts`, args);
/**
 * 11:绑定客户经理
 */
export const salemans = (args) => post(`${global.cf.configUrl}/business/salemans`, args);
/**
 * 12:添加活动
 */
export const activities = (args) => post(`${global.cf.configUrl}/activities`, args);
/**
 * 13,获取满足活动条件的规则
 */
export const rules = (args) => get(`${global.cf.configUrl}/activities/rules`, args);
/**
 * 16:获取B端首页信息
 */
export const getByToken = (args) => get(`${global.cf.configUrl}/business/getByToken`, args);
/**
 * 24,获取订单
 */
export const orders = (args) => get(`${global.cf.configUrl}/orders`, args);
/**
 * 25,获取所有评价
 */
export const comments = (args) => get(`${global.cf.configUrl}/orders/comments`, args);
/**
 * 26,回复评价评价
 */
export const replyComment = (args) => post(`${global.cf.configUrl}/orders/replyComment`, args);
/**
 * 27,活动详情
 */
export const getActivities = (args) => get(`${global.cf.configUrl}/activities`, args);
/**
 * 29,获取消息
 */
export const messages = (args) => get(`${global.cf.configUrl}/search/messages`, args);
/**
 * 30,获取活动
 */
export const searchActivities = (args) => get(`${global.cf.configUrl}/search/activities`, args);
/**
 * 31,订单详情
 */
export const ordersDetail = (args) => get(`${global.cf.configUrl}/orders/${args}`);
/**
 * 14,获取商户下的子店
 */
export const childBusiness = (args) => get(`${global.cf.configUrl}/business/childBusiness`, args);
/**
 * 28,核销
 */
export const newWriteoff = (args) => post(`${global.cf.configUrl}/orders/newWriteoff`, args);
/**
 * 23,获取子店详情
 */
export const childDetail = (args) => get(`${global.cf.configUrl}/business/child/${args}`);
/**
 * 34,获取子店统计详情
 */
export const childsShop = (args) => get(`${global.cf.configUrl}/statistics/shop/childs/${args}`);
/**
 * 33,获取子店统计
 */
export const childStatistics = (args) => get(`${global.cf.configUrl}/statistics/shop/childs`, args);
/**
 * 24,修改子店账户信息
 */
export const childAccounts = (args) => post(`${global.cf.configUrl}/business/child/accounts`, args);
/**
 * 35,获取我的店铺信息
 */
export const getMyStoreInfo = () => get(`${global.cf.configUrl}/business`);
/**
 * 38,获取活动统计
 */
export const activitiesCount = (args) => get(`${global.cf.configUrl}/activities/count`, args);
/**
 * 39,撤回活动
 */
export const activitiesState = (args) => post(`${global.cf.configUrl}/activities/state`, args);
/**
 * 40,删除活动活动
 */
export const activitiesDelete = (args) => post(`${global.cf.configUrl}/activities/delete`, args);
/**
 * 36,获取积分明细
 */
export const getBscoredetail = (args) => get(`${global.cf.configUrl}/score/bscoredetail`, args);
/**
 * 41,获取账户流水
 */
export const accountflow = (args) => get(`${global.cf.configUrl}/search/accountflow`, args);
/**
 * 22,修改商户账户信息包括重提交新审核和补充资料
 */
export const reapply = (args) => post(`${global.cf.configUrl}/business/accounts/reapply`, args);
/**
 * 4,更新店铺银行账户
 */
export const updateAccount = (args) => post(`${global.cf.configUrl}/business/updateAccount`, args);
/**
 * 45,接口功能：识别营业执照
 */
export const ocrBusinessLicense = (args) => get(`${global.cf.configUrl}/ocr/ocrBusinessLicense`, args);
/**
 * 44,接口功能：识别银行卡
 */
export const ocrBankCardAction = (args) => get(`${global.cf.configUrl}/ocr/ocrBankCardAction`, args);
/**
 * 43,接口功能：识别身份证
 */
export const ocrIdCardAction = (args) => get(`${global.cf.configUrl}/ocr/ocrIdCardAction`, args);
/**
 * 42,修改时获取店铺信息
 */
export const getById = (args) => get(`${global.cf.configUrl}/business/getById`, args);
/**
 * 17,重新发布店铺或者修改自己店铺信息
 */
export const reply = (args) => post(`${global.cf.configUrl}/business/reply`, args);
/**
 * 18,补充店铺资料
 */
export const supplement = (args) => post(`${global.cf.configUrl}/business/supplement`, args);
/**
 * 19,获取店主信息
 */
export const getShopkeepers = (args) => get(`${global.cf.configUrl}/business/shopkeeper`, args);
/**
 * 21,修改店主信息包括重提交新审核和补充资料
 */
export const postShopkeepers = (args) => post(`${global.cf.configUrl}/business/shopkeepers/reapply`, args);
/**
 * 获取钱和生意点
 */
export const getInfo = (args) => get(`${global.cf.configUrl}/search/info`, args);
/**
 * 退出
 */
export const logout = () => post(`${global.cf.configUrl}/users/logout`);
/**
 * 获取活动说明标签
 */
export const labels = (args) => get(`${global.cf.configUrl}/activities/labels`, args);

/**
 * 二期
 */
/**
 * 审核成功时获取商户修改信息
 */
export const getSome = (args) => get(`${global.cf.configUrl}/business/getSome`, args);
/**
 * 更新营业时间和营业时间段
 */
export const updateSome = (args) => post(`${global.cf.configUrl}/business/updateSome`, args);
/**
 * 更新店铺人均价
 */
export const updateAvgPrice = (args) => post(`${global.cf.configUrl}/business/updateAvgPrice`, args);
/**
 * 5.接口功能：选择门店列表
 */
export const getStoreList = (args) => get(`${global.cf.configUrl}/cashier/store`, args);
/**
 * 6.接口功能：查询收银员列表
 */
export const getCashierList = (args) => get(`${global.cf.configUrl}/cashier`, args);
/**
 * 7.接口功能：添加或者修改收银员
 */
export const addRevaCashier = (args) => post(`${global.cf.configUrl}/cashier`, args);
/**
 * 9.接口功能：删除收银员
 */
export const cashierClear = (args) => post(`${global.cf.configUrl}/cashier/clear`, args);
/**
 * 8.接口功能：获取收银员详情
 */
export const getCashierDetail = (args) => get(`${global.cf.configUrl}/cashier/${args}`);
/**
 * 推广获取海报
 */
// export const getPoster = () => get(`${global.cf.configUrl}/QRCode/wx`);
export const getPoster = (args) => noLoad('GET', `${global.cf.configUrl}/QRCode/wx`, args, 'arraybuffer');
/**
 * 获取推广记录列表
 */
export const getSpread = (args) => get(`${global.cf.configUrl}/search/spread`, args);
/**
 * 获取推广回报总额
 */
export const getReward = (args) => get(`${global.cf.configUrl}/search/reward`, args);
/**
 * 根据银行卡号识别银行名称
 */
export const postCheckCard = (args) => post(`${global.cf.configUrl}/accounts/card/check`, args);
/**
 * 添加银行卡
 */
export const postAddCards = (args) => post(`${global.cf.configUrl}/accounts/cards`, args);
/**
 * 查询银行卡列表
 */
export const getCardsList = (args) => get(`${global.cf.configUrl}/accounts/cards`, args);
/**
 * 获取账户余额和可结算余额
 */
export const getAccounts = (args) => get(`${global.cf.configUrl}/accounts`, args);
/**
 * 提现
 */
export const getWithdraw = (args) => post(`${global.cf.configUrl}/accounts/withdraw`, args);
/**
 * 获取提现详情
 */
export const getWithdrawDetail = (args) => get(`${global.cf.configUrl}/accounts/withdraw/detail`, args);
/**
 * 获取推广回报总额
 */
export const getreward = (args) => get(`${global.cf.configUrl}/search/reward`, args);
/**
 * 获取邀请记录列表
 */
export const getspread = (args) => get(`${global.cf.configUrl}/search/spread`, args);
/**
 * 解绑银行卡
 */
export const postUntied = (args) => post(`${global.cf.configUrl}/accounts/untied`, args);

// 查询福利限制天数
export const welfareRules = (args) => get(`${global.cf.configUrl}/welfare/activities/rules`, args);
// 添加和修改福利
export const welfareActivities = (args) => post(`${global.cf.configUrl}/welfare/activities`, args);
// 查询福利活动列表
export const searchWelfare = (args) => get(`${global.cf.configUrl}/search/welfare`, args);
// 活动列表撤回福利
export const welfareState = (args) => post(`${global.cf.configUrl}/welfare/activities/state`, args);
// 活动列表删除福利
export const welfareDelete = (args) => post(`${global.cf.configUrl}/welfare/activities/delete`, args);
// 查询福利详情
export const welfareDetail = (args) => get(`${global.cf.configUrl}/welfare/activities/detail`, args);
// 福利活动分析
export const welfareCount = (args) => get(`${global.cf.configUrl}/welfare/activities/count`, args);
// 点聚合
export const thermalMap = (args) => get(`${global.cf.configUrl}/statistics/thermalMap`, args);
// 获取店铺照片
export const getImgs = (args) => get(`${global.cf.configUrl}/business/getImgs`, args);
// 修改店铺照片
export const updateImg = (args) => post(`${global.cf.configUrl}/business/updateImg`, args);
// 获取店铺简介
export const getIntro = (args) => get(`${global.cf.configUrl}/business/getIntro`, args);
// 获取服务标签
export const getlabels = (args) => get(`${global.cf.configUrl}/business/labels`, args);
// 修改店铺服务设施标签
export const updateService = (args) => post(`${global.cf.configUrl}/business/updateService`, args);
// 修改店铺介绍
export const updateIntro = (args) => post(`${global.cf.configUrl}/business/updateIntro`, args);
// 活动管理列表查询
export const manage = (args) => get(`${global.cf.configUrl}/search/manage`, args);
// 统计折线图
export const getLineChart = (args) => get(`${global.cf.configUrl}/statistics/lineChart`, args);
// 获取活动海报
export const getExpandPoster = (args) => noLoad('GET', `${global.cf.configUrl}/QRCode/poster`, args, 'arraybuffer');

// 实时获取商户手机号
export const intimePhone = (args) => get(`${global.cf.configUrl}/users/phone`, args);
// 提现发送验证码
export const withdrawSmscode = (args) => post(`${global.cf.configUrl}/accounts/smscode`, args);
// 获取店铺营业时间
export const shopOpenHours = (args) => get(`${global.cf.configUrl}/activities/openHours`, args);
// 获取商品分类
export const categories = (args) => get(`${global.cf.configUrl}/categories/child-by-current-user`, args);






















/**
 * 服务器根域名
 * 试玩更多接口看这里
 * http://jsonplaceholder.typicode.com/
 * @type {string}
 */
export const API_ROOT = 'https://jsonplaceholder.typicode.com';
/**
 * 获取照片
 */
export const getPhoto = (id) => get(`${API_ROOT}/photos/${id}`);