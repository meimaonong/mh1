
const params = require('../../utils/params')
const app = getApp()

Page({
  data: {
    work: null,
    pics: []
  },
  preview: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    wx.previewImage({
      current: that.data.pics[index],
      urls: that.data.pics
    })
  },
  getWork: function (work) {
    var that = this
    work.workItems.map(function (item) {
      that.data.pics.push(item.work_item_img)
      item['style'] = 'height:' + (690 / parseFloat(item.ratio)) + 'rpx'
    })
    that.setData({
      work: work,
      pics: that.data.pics
    })
  },
  onLoad: function (options) {
    var that = this
    var work = JSON.parse(options.work)
    that.getWork(work)

  }

})