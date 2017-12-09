const app = getApp()

Page({
  data: {
    work: null,
    imgBase: app.globalData.params.imgBase,
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
          that.data.pics.push(that.data.imgBase + item.img.img_url + 'w1080/' +  item.img.img_name)
          item['style'] = 'height:' + (690 / parseFloat(item.img.img_ratio)) + 'rpx'
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
    var work_id = options.work_id
    that.getWork(work_id)

  }

})