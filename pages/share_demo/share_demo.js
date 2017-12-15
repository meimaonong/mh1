const app = getApp()

Page({
  data: {
    work: null,
    imgBase: app.globalData.params.imgBase,
  },
  getWork: function (work_id) {
    var that = this
    wx.showLoading({
      title: '',
    })
    wx.request({
      url: app.globalData.params.api + '/v1/work/get-work',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'access-token': app.globalData.sessionId
      },
      data: {
        work_id: work_id
      },
      success: function (res) {
        var data = res.data.data
        
        that.setData({
          work: data,
        })
        wx.hideLoading()
      }
    })
  },
  onLoad: function (options) {
    var that = this
    that.getWork(10)
  },
  onShareAppMessage: function (res) {
    var that = this
    return {
      title: that.data.work.work_title,
      imageUrl: that.data.imgBase + that.data.work.img.img_url + that.data.work.img.img_name + '?imageView2/2/w/1080',
      path: '/pages/detail/detail?work_id=' + that.data.work.work_id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})