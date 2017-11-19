// pages/adress_edit/adress_edit.js
const params = require('../../utils/params')
const app = getApp()

Page({

  data: {
    user: {
      
    },
    isEdit: false
  },
  getUser: function () {
    var that = this
    wx.request({
      url: params.api + '/v1/user/get-user',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'access-token': app.globalData.sessionId
      },
      method: 'post',
      success: function (res) {
        that.setData({
          user: res.data.data
        })
      }
    })
  },
  edit: function(e){
    var that = this
    that.setData({
      isEdit: true
    })
  },
  cancel: function (e) {
    var that = this
    that.setData({
      isEdit: false
    })
  },
  formSubmit: function (e) {
    var that = this
    var user = Object.assign(that.data.user, e.detail.value)

    wx.request({
      url: params.api + '/v1/user/save-user',
      data: {
        ...user
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'access-token': app.globalData.sessionId
      },
      method: 'post',
      success: function (res) {
        wx.showToast({
          title: '保存成功',
          mask: true,
          icon: 'success',
          duration: 2000
        })
        setTimeout(function(){
          wx.navigateBack()
        }, 2000)
      }
    })
  },
  onLoad: function (options) {

    var that = this
    that.getUser()

  }

})