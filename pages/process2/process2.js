// pages/process/process.js
const params = require('../../utils/params')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: -1,
    img: '',
  },
  del: function (e) {
    var that = this

    wx.showModal({
      title: '确定删除此项？',
      content: '',
      success: function (res) {
        if (res.confirm) {
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2];  //上一个页面
          var work = prevPage.data.work
          work.workItems.splice(that.data.index, 1)
          prevPage.setData({
            work: work
          })
          wx.navigateBack()
        } else if (res.cancel) {
          //console.log('用户点击取消')
        }
      }
    })

  },
  chooseImg: function () {

    var that = this

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths

        wx.uploadFile({
          url: params.api + '/v1/file/image-upload',
          filePath: tempFilePaths[0],
          name: 'file',
          success: function (res) {
            var r = JSON.parse(res.data)
            var pages = getCurrentPages();
            var prevPage = pages[pages.length - 2];  //上一个页面
            var work = prevPage.data.work
            var img_url = params.api + '/' + r.data.fileUrl

            work['workItems'][that.data.index]['work_item_img'] = img_url
            that.setData({
              img: img_url
            })
            prevPage.setData({
              work: work
            })
            wx.navigateBack()
          }
        })

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this
    that.setData({
      index: that.options.index,
      img: that.options.img,
    })

  }
 
})