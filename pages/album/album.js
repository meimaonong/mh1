// pages/album/album.js
const params = require('../../utils/params')
const app = getApp()

Page({
  data: {
    albums: null
  },
  getAlbums: function() {
    var that = this

    wx.request({
      url: params.api + '/v1/album/get-albums',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'access-token': app.globalData.sessionId
      },
      method: 'post',
      success: function (res) {
        that.setData({
          albums: res.data.data
        })

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getAlbums()
  },

  
})