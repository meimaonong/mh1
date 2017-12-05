const app = getApp()

Page({
  data: {
    list: null,
    imgBase: app.globalData.params.imgBase,
  },
  getMessages: function(){
    var that = this
    wx.request({
      url: app.globalData.params.api + '/v1/message/get-messagelist',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'access-token': app.globalData.sessionId
      },
      method: 'post',
      success: function (res) {
        that.setData({
          list: res.data.data
        })
        console.log(that.data.list)
      }
    })
  },
  doRead: function() {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      msg_num: 0
    })
  },
  onLoad: function (options) {
    var that = this
    that.getMessages()
    that.doRead()
  },

})