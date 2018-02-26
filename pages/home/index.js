// pages/tabBar/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeCategoryId: 215,
    autoplay: true,  //  自动播放
    interval: 3000,  //  自动播放时间间隔
    duration: 1000,  //  延时
    swiperCurrent: 0, // 当前轮播图
    selectCurrent: 0, // 点击的轮播图
    scrollTop: "0",
    pageSize: 1,  // 页数
    pageIndex:20,  // 条数
    hasMoreData: true, // 是否更多数据
    goods: [],  //  商品列表
    loadingMoreHidden: true,
  },
  tabClick: function (e) {
    this.setData({
      activeCategoryId: e.currentTarget.id
    });
    this.getGoodsList(this.data.activeCategoryId)
  },
 
  // 跳转商品
  toDetailsTap: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: "/pages/details/details?pid=" + e.currentTarget.dataset.id
    })
  },
  // banner图
  swiperchange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  // 列表
  getGoodsList: function (pid) {
    wx.showLoading({
      title: '玩命加载中',
    }) 
    wx.request({
      url: 'https://api.it120.cc/meta/shop/goods/list',
      data: {
      },
      success: (res) => {
        console.log(res)
        if (res.statusCode == 200) {
          this.setData({
            goods: res.data.data  //  首页导航栏
          })
          wx.hideLoading()
        }
      }
    })
  },
  pay: function () {
    var timeStamp = new Date().toLocaleTimeString()
    console.log(timeStamp)
    wx.requestPayment(
      {
        'timeStamp': timeStamp,  //  当前时间
        'nonceStr': '',  // 随机字符串，长度为32个字符以下。
        'package': '',  //  统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*
        'signType': 'MD5',  //  签名类型，默认为MD5，支持HMAC-SHA256和MD5。注意此处需与统一下单的签名类型一致
        'paySign': '',  //  签名,具体签名方案参见微信公众号支付帮助文档;
        'success': function (res) {
            //  接口调用成功的回调函数
         },
        'fail': function (res) {
            //  接口调用失败的回调函数
            console.log(res)
         },
        'complete': function (res) { 
          //  接口调用结束的回调函数（调用成功、失败都会执行）
          console.log(res)
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://api.it120.cc/meta/shop/goods/list',
      data: {
      },
      success: (res) => {
        console.log(res)
        if (res.statusCode == 200) {
          this.setData({
            banners: res.data.data  //  首页导航栏
          })
        }
      }
    })
      this.getGoodsList(this.data.activeCategoryId)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.request({
      url: 'https://api.it120.cc/meta/shop/goods/list',
      data: {
      },
      success: (res) => {
        console.log(res)
        if (res.statusCode == 200) {
          this.setData({
            navList: res.data.data  //  首页导航栏
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function (e) {
    console.log(1)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      loadingMoreHidden: false  //  underline
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})