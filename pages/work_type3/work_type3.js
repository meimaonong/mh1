
const app = getApp()

Page({
  data: {
    list: null,
    imgBase: app.globalData.params.imgBase,
  },
  getList() {
    var that = this

    wx.request({
      url: app.globalData.params.api + '/v1/order/get-buy-orders',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'access-token': app.globalData.sessionId
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