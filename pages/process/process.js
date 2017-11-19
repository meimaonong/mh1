// pages/process/process.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,
    index: -1,
    val: '',
  },
  confirm: function (e) {
    var val = e.detail.value
    var that = this
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    var work = prevPage.data.work

    if (that.data.type == 1) {
      work['work_title'] = val
    } else {
      work['workItems'][that.data.index].work_item_des = val
    }
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      work
    })
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      type: that.options.type,
      index: that.options.index,
      val: that.options.txt,
    })

    if (that.data.type == 1) {
      wx.setNavigationBarTitle({
        title: '修改标题'
      })
    } else {
      wx.setNavigationBarTitle({
        title: '编辑文字'
      })
    }

  }
})