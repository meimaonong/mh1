const app = getApp()

Page({
  data: {
    work: null,
    imgBase: app.globalData.params.imgBase
  },
  getWork: function(work_id){
    var that = this
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
        data.workItems.map(function(item){
          item['style'] = 'height:' + (690 / parseFloat(item.img.img_ratio)) + 'rpx'
        })
        console.log(data)
        that.setData({
          work: data
        })
      }
    })
  },
  onLoad: function (options) {
    var that = this
    var work_id = options.work_id
    that.getWork(work_id)

  }

})