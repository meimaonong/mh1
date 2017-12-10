
const app = getApp()

Page({
  data: {
    albums: null,

    imgBase: app.globalData.params.imgBase,
  },
  del: function (index, album_id, num) {
    var that = this

    wx.showModal({
      title: '确定删除？',
      content: '',
      success: function (res) {
        if (res.confirm) {
          if (parseInt(num) > 0) {
            wx.showToast({
              title: '作品不为空',
              image: '/public/img/icon/error.png',
              duration: 2000
            })
            return
          }

          wx.request({
            url: app.globalData.params.api + '/v1/album/del-album',
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
  edit: function (album_id) {
    var that = this
    wx.navigateTo({
      url: '/pages/album_edit/album_edit?album_id=' + album_id,
    })
  },
  show_action: function(e) {
    var that = this
    var tobj = e.currentTarget.dataset
    wx.showActionSheet({
      itemList: ['编辑', '删除'],
      success: function (res) {
        if (res.tapIndex == 0) {
          that.edit(tobj.id)
        } else if (res.tapIndex == 1) {
          that.del(tobj.index, tobj.id, tobj.num)
        }
      },
      fail: function (res) {
        //console.log(res.errMsg)
      }
    })
  },
  getAlbums: function() {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.params.api + '/v1/album/get-albums',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'access-token': app.globalData.sessionId
      },
      method: 'post',
      success: function (res) {
        that.setData({
          albums: res.data.data
        })
        wx.hideLoading()
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