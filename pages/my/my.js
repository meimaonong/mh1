// pages/my/my.js
const params = require('../../utils/params')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    wait_num: 0,
    sell_num: 0,
    buy_num: 0,
    msg_num: 0,
    album_num: 0,
  },
  getNum: function() {
    var that = this
    wx.request({
      url: params.api + '/v1/data/get-my-data',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        user_id: 1
      },
      success: function (res) {
        var r = res.data.data

        that.setData({
          wait_num: parseInt(r.wait_num),
          sell_num: parseInt(r.sell_num),
          buy_num: parseInt(r.buy_num),
          msg_num: parseInt(r.msg_num),
          album_num: parseInt(r.album_num)
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getNum()
  },

})