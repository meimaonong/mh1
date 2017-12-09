const app = getApp()

Page({
  data: {
    list: null,
    imgBase: app.globalData.params.imgBase,
  },
  show_action(e) {
    console.log()
  },
  getList() {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.params.api + '/v1/work/get-wait-works',
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
        wx.hideLoading()
      }
    })
  },
  onLoad: function (options) {
    var that = this
    that.getList()
  }
})