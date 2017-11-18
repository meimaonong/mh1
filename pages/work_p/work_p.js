
const params = require('../../utils/params')
const app = getApp()

Page({
  data: {
    work: null,
    pics: []
  },
  preview: function(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    wx.previewImage({
      current: that.data.pics[index], 
      urls: that.data.pics
    })
  },
  getWork: function (work_id) {
    var that = this
    wx.request({
      url: params.api + '/v1/work/get-work',
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
        data.workItems.map(function (item) {
          that.data.pics.push(item.work_item_img)
          item['style'] = 'height:' + (690 / parseFloat(item.ratio)) + 'rpx'
        })
        that.setData({
          work: data,
          pics: that.data.pics
        })
      }
    })
  },
  onLoad: function (options) {
    var that = this
    that.getWork(options.work_id)

  }

})