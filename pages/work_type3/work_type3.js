const params = require('../../utils/params')
Page({
  data: {
    list: null
  },
  getList() {
    var that = this

    wx.request({
      url: params.api + '/v1/work/get-buy-works',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
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