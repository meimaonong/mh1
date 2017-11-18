const params = require('../../utils/params')
const app = getApp()

Page({
  data: {
    list: null
  },
  getList() {
    var that = this

    wx.request({
      url: params.api + '/v1/work/get-wait-works',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'access-token': app.globalData.sessionId
      },
      data: {
        user_id: 1
      },
      method: 'post',
      success: function (res) {
        var r = res.data.data
        that.setData({
          list: r
        })
      }
    })
  },
  onLoad: function (options) {
    var that = this
    that.getList()
  }
})