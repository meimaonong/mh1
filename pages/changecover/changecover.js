// pages/process/process.js
const params = require('../../utils/params')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: [],
    selIndex: 0,
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

        wx.uploadFile({
          url: params.api + '/v1/file/image-upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          success: function (res) {
            let r = JSON.parse(res.data)
            var pages = getCurrentPages();
            var prevPage = pages[pages.length - 2];  //上一个页面
            var work = prevPage.data.work
            work['work_img'] = params.api + '/' + r.data.fileUrl
            work['w'] = r.data.imageWidth
            work['h'] = r.data.imageHeight
            work['ratio'] = r.data.ratio
            
            prevPage.setData({
              work: work
            })
            console.log(prevPage.data.work)
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
    if (work['work_img'] != that.data.imgs[index]) {
      if (that.data.imgs.length==work.workItems.length) {
        work['w'] = work.workItems[index]['w']
        work['h'] = work.workItems[index]['h']
        work['ratio'] = work.workItems[index]['ratio']
        work['work_img'] = work.workItems[index]['work_item_img']
      }else{
        work['w'] = work.workItems[index - 1]['w']
        work['h'] = work.workItems[index - 1]['h']
        work['ratio'] = work.workItems[index - 1]['ratio']
        work['work_img'] = work.workItems[index - 1]['work_item_img']
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
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})