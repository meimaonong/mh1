// pages/category/category.js
const app = getApp()

Page({
  data: {
    list: [],
    imgBase: app.globalData.params.imgBase
  },
  onLoad: function (options) {

    var that = this

    wx.request({
      url: app.globalData.params.api + '/v1/category/get-categorylist',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success: function (res) {
        that.setData({
          list: res.data.data
        })
      }
    })
  },

})