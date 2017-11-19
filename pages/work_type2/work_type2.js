const params = require('../../utils/params')
const app = getApp()

Page({
  data: {
    list: null,
    s_index: -1,
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

    wx.request({
      url: params.api + '/v1/work/get-sell-works',
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