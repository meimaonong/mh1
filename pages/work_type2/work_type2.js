
const app = getApp()

Page({
  data: {
    list: null,
    s_index: -1,
    imgBase: app.globalData.params.imgBase,
  },
  edit_express: function(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var txt = e.currentTarget.dataset.txt
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/express_edit/express_edit?index=${index}&id=${id}&txt=${txt}`,
    })
  },
  getList() {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.params.api + '/v1/order/get-sell-orders',
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