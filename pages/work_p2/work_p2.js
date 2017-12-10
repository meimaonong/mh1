

const app = getApp()

Page({
  data: {
    work: null,
    pics: [],
    imgBase: app.globalData.params.imgBase,
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
      that.data.pics.push(that.data.imgBase + item.img.img_url + 'w1080/' + item.img.img_name)
      item['style'] = 'height:' + (690 / parseFloat(item.img.img_ratio)) + 'rpx'
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