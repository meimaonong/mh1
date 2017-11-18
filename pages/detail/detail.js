// pages/detail/detail.js

const params = require('../../utils/params')
const app = getApp()

Page({
  data: {
    work: null
  },
  getWork: function(work_id){
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
        data.workItems.map(function(item){
          item['style'] = 'height:' + (690 / parseFloat(item.ratio)) + 'rpx'
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