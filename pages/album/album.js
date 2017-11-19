// pages/album/album.js
const params = require('../../utils/params')
const app = getApp()

Page({
  data: {
    albums: null,
    isEdit: false
  },
  del: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var album_id = e.currentTarget.dataset.id
    var num = e.currentTarget.dataset.num

    wx.showModal({
      title: '确定删除？',
      content: '',
      success: function (res) {
        if (res.confirm) {
          console.log(parseInt(num));
          if (parseInt(num) > 0) {
            wx.showToast({
              title: '作品不为空',
              image: '/public/img/icon/wrong.png',
              duration: 2000
            })
            return
          }

          wx.request({
            url: params.api + '/v1/album/del-album',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'access-token': app.globalData.sessionId
            },
            data: {
              album_id
            },
            method: 'post',
            success: function (res) {
              that.data.albums.splice(index, 1)
              that.setData({
                albums: that.data.albums
              })
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000
              })
            }
          })


        } else if (res.cancel) {
          //console.log('用户点击取消')
        }
      }
    })
  },
  edit: function (e) {
    var that = this
    var album_id = e.currentTarget.dataset.id
    that.setData({ isEdit: false })
    wx.navigateTo({
      url: '/pages/album_edit/album_edit?album_id=' + album_id,
    })
  },
  toggle: function () {
    var that = this
    that.setData({
      isEdit: !that.data.isEdit
    })
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