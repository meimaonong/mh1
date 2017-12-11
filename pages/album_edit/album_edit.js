// pages/adress_edit/adress_edit.js

const app = getApp()

Page({

  data: {
    album: {
      album_id: '',
      album_title: '',
      album_des: '',
    }
  },
  getAlbum: function(album_id){
    var that = this
    wx.request({
      url: app.globalData.params.api + '/v1/album/get-album',
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
  formSubmit: function(e) {
    var that = this
    var album = Object.assign(that.data.album, e.detail.value)

    wx.request({
      url: app.globalData.params.api + '/v1/album/save-album',
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
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];  //上一个页面
        var albums = prevPage.data.albums
        if (album['album_id']) {
          albums.map(function(item){
            if (item.album_id == album['album_id']) {
              item = Object.assign(item, res.data.data)
            }
          })
        } else {
          albums.push({...res.data.data,num:0})
        }
        prevPage.setData({
          albums
        })
        wx.navigateBack()

      }
    })
  },
  back: function() {
    wx.navigateBack()
  },
  onLoad: function (options) {
    
    var that = this
    if (options.album_id) {
      that.getAlbum(options.album_id)
    }

  }

})