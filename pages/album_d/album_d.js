const app = getApp()

Page({
  data: {
    list: null,
    isEdit: false,
    album_title: '',

    imgBase: app.globalData.params.imgBase,
  },

  del: function (index, work_id) {
    var that = this
    wx.showModal({
      title: '确定删除？',
      content: '',
      success: function (res) {
        if (res.confirm) {

          wx.request({
            url: app.globalData.params.api + '/v1/work/del-work',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'access-token': app.globalData.sessionId
            },
            data: {
              work_id: work_id
            },
            method: 'post',
            success: function (res) {
              that.data.list.splice(index, 1)
              that.setData({
                list: that.data.list
              })
            }
          })

          
        } else if (res.cancel) {
          //console.log('用户点击取消')
        }
      }
    })
  },
  edit: function (work_id) {
    var that = this

    that.setData({ isEdit: false})
    wx.navigateTo({
      url: '/pages/work_edit/work_edit?work_id=' + work_id,
    })
  },
  getWorks: function(album_id) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.params.api + '/v1/work/get-worklist-by-album',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'access-token': app.globalData.sessionId
      },
      data: {
        album_id: album_id
      },
      method: 'post',
      success: function (res) {
        that.setData({
          list: res.data.data
        })
        wx.hideLoading()
      }
    })
  },
  show_action: function (e) {
    var that = this
    var tobj = e.currentTarget.dataset
    wx.showActionSheet({
      itemList: ['编辑', '删除'],
      success: function (res) {
        if (res.tapIndex == 0) {
          that.edit(tobj.id)
        } else if (res.tapIndex == 1) {
          that.del(tobj.index, tobj.id)
        }
      },
      fail: function (res) {
        //console.log(res.errMsg)
      }
    })
  },
  onLoad: function (options) {
    var that = this
    that.setData({
      album_title: options.album_title
    })
    that.getWorks(options.album_id)
  },

 
})