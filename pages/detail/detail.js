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
        data.workItems.map(function(item){
          that.data.pics.push(that.data.imgBase + item.img.img_url + 'w1080/' +  item.img.img_name)
          item['style'] = 'height:' + (690 / parseFloat(item.img.img_ratio)) + 'rpx'
        })

        that.setData({
          work: data,
          pics: that.data.pics
        })
        wx.hideLoading()
      }
    })
  },
  onLoad: function (options) {
    var that = this
    var work_id = options.work_id
    that.getWork(work_id)
  },
  onShareAppMessage: function (res) {

    var that = this

    // if (res.from === 'button') {
    //   // 来自页面内转发按钮
    //   console.log(res.target)
    // }
    return {
      title: that.data.work.work_title,
      imageUrl: that.data.imgBase + that.data.work.img.img_url + 'w1080/' + that.data.work.img.img_name,
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