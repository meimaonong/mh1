// pages/home/home.js
const app = getApp()
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseInfo: null,
    imgBase: app.globalData.params.imgBase
  },
  getHomeData: function() {
    var that = this
    wx.request({
      url: app.globalData.params.api + '/v1/data/get-home-data', //仅为示例，并非真实的接口地址
      method: 'post',
      success: function (res) {
        
        that.setData({
          baseInfo: res.data.data
        })

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getHomeData()
  }

})