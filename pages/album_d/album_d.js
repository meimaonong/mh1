// pages/album_d/album_d.js
const params = require('../../utils/params')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: null,
    isEdit: false,
  },
  toggle: function() {
    var that = this
    that.setData({
      isEdit: !that.data.isEdit
    })
  },
  del: function(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var work_id = e.currentTarget.dataset.id
    wx.showModal({
      title: '确定删除？',
      content: '',
      success: function (res) {
        if (res.confirm) {

          wx.request({
            url: params.api + '/v1/work/del-work',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              user_id: 1,
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
  edit: function (e) {
    var that = this
    var work_id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/work_edit/work_edit?work_id=' + work_id,
    })
  },
  getWorks: function(album_id) {
    var that = this

    wx.request({
      url: params.api + '/v1/work/get-worklist-by-album',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        user_id: 1,
        album_id: album_id
      },
      method: 'post',
      success: function (res) {
        that.setData({
          list: res.data.data
        })

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var album_id = options.album_id ? options.album_id : 1
    that.getWorks(album_id)
  },

 
})