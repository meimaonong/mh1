const params = require('../../utils/params')
const app = getApp()
Page({
  data: {
    list: null,
    isEdit: false
  },
  del: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var address_id = e.currentTarget.dataset.id

    wx.showModal({
      title: '确定删除？',
      content: '',
      success: function (res) {
        if (res.confirm) {
      
          wx.request({
            url: params.api + '/v1/address/del-address',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'access-token': app.globalData.sessionId
            },
            data: {
              address_id
            },
            method: 'post',
            success: function (res) {
              that.data.list.splice(index, 1)
              that.setData({
                list: that.data.list
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
    var address_id = e.currentTarget.dataset.id
    that.setData({ isEdit: false })
    wx.navigateTo({
      url: '/pages/address_edit/address_edit?address_id=' + address_id,
    })
  },
  toggle: function () {
    var that = this
    that.setData({
      isEdit: !that.data.isEdit
    })
  },
  getAddressList: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: params.api + '/v1/address/get-addresslist',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'access-token': app.globalData.sessionId
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
  onLoad: function (options) {
    var that = this
    that.getAddressList()
  },
})