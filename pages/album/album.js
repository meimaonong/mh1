// pages/album/album.js
const params = require('../../utils/params')

Page({
  data: {
    albums: null
  },
  getAlbums: function() {
    var that = this

    wx.request({
      url: params.api + '/v1/album/get-albums',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        user_id: 1
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