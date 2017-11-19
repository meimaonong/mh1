const params = require('../../utils/params')
const app = getApp()
Page({
  data: {
    sell_record_id: 0,
    index: -1,
    val: '',
  },
  confirm: function (e) {
    var val = e.detail.value
    var that = this

    wx.request({
      url: params.api + '/v1/sell-record/save-express',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'access-token': app.globalData.sessionId
      },
      data:{
        sell_record_id: that.data.sell_record_id,
        express: val
      },
      success: function (res) {
        var r = res.data.data
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];  //上一个页面
        var list = prevPage.data.list
        list.work_list[that.data.index]['express'] = val

        //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
        prevPage.setData({
          list: list
        })
        wx.navigateBack()
      }
    })

    
  },


  onLoad: function (options) {
    var that = this
    that.setData({
      sell_record_id: that.options.id,
      index: that.options.index,
      val: that.options.txt,
    })

    wx.setNavigationBarTitle({
      title: '编辑快递信息'
    })

  }
})