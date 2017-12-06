// pages/process/process.js

const app = getApp()

Page({

  data: {
    imgs: [],
    selIndex: 0,

    imgBase: app.globalData.params.imgBase,
  },
  chooseImg: function () {

    var that = this

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths

        wx.showLoading({
          title: '上传中',
          mask: true,
        })

        wx.uploadFile({
          url: app.globalData.params.api + '/v1/file/image-upload', //仅为示例，非真实的接口地址
          header: {
            'access-token': app.globalData.sessionId
          },
          filePath: tempFilePaths[0],
          name: 'file',
          success: function (res) {
            let r = JSON.parse(res.data)
            var pages = getCurrentPages();
            var prevPage = pages[pages.length - 2];  //上一个页面
            var work = prevPage.data.work

            work.img = Object.assign(work.img, {
              img_name: r.data.img_name,
              img_url: r.data.img_url,
              img_width: r.data.img_width,
              img_height: r.data.img_height,
              img_ratio: r.data.img_ratio,
            })
            
            prevPage.setData({
              work: work
            })
            //console.log(prevPage.data.work)
            wx.hideLoading()
            wx.navigateBack()
          }
        })

      }
    })
  },
  sel: function (e) {
    var index = e.currentTarget.dataset.index
    var that = this
    that.setData({
      selIndex: index
    })

    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    var work = prevPage.data.work
    if ((that.data.imgBase + work.img.img_url + work.img.img_name) != that.data.imgs[index]) {
      if (that.data.imgs.length==work.workItems.length) {
        work.img = Object.assign(work.img, work.workItems[index].img)
      }else{
        work.img = Object.assign(work.img, work.workItems[index - 1].img)
      }
    }

    prevPage.setData({
      work: work
    })
    wx.navigateBack()
  },
  onLoad: function (options) {
    var that = this
    that.setData({
      imgs: JSON.parse(that.options.imgs),
      selIndex: that.options.selIndex
    })
  }
  
})