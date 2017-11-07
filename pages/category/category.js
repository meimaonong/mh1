// pages/category/category.js
const params = require('../../utils/params')

Page({
  data: {
    list: [],
  },
  onLoad: function (options) {

    var that = this

    wx.request({
      url: params.api + '/v1/category/get-categorylist',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success: function (res) {
        that.setData({
          list: res.data.data
        })
        console.log(res.data)
      }
    })
  },

})