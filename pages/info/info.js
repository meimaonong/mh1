// pages/adress_edit/adress_edit.js
const params = require('../../utils/params')
const app = getApp()

Page({

  data: {
    album: {
      album_id: '',
      album_title: '',
      album_des: '',
    }
  },
  getAlbum: function (album_id) {
    var that = this
    wx.request({
      url: params.api + '/v1/album/get-album',
      data: {
        album_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'access-token': app.globalData.sessionId
      },
      method: 'post',
      success: function (res) {
        that.setData({
          album: res.data.data
        })
      }
    })
  },
  formSubmit: function (e) {
    var that = this
    var album = Object.assign(that.data.album, e.detail.value)

    wx.request({
      url: params.api + '/v1/album/save-album',
      data: {
        ...album
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'access-token': app.globalData.sessionId
      },
      method: 'post',
      success: function (res) {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
        wx.navigateBack()
      }
    })
  },
  back: function () {
    wx.navigateBack()
  },
  onLoad: function (options) {

    var that = this
    if (options.album_id) {
      that.getAlbum(options.album_id)
    }

  }

})