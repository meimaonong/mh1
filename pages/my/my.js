// pages/my/my.js
const app = getApp()

Page({
  data: {
    wait_num: 0,
    sell_num: 0,
    buy_num: 0,
    msg_num: 0,
    album_num: 0,
    bindPhone: '',
    userInfo: {
      avatarUrl: '',
      nickName: '',
    }
  },
  getNum: function() {
    var that = this
    wx.request({
      url: app.globalData.params.api + '/v1/data/get-my-data',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'access-token': app.globalData.sessionId
      },
      success: function (res) {
        var r = res.data.data

        that.setData({
          wait_num: parseInt(r.wait_num),
          sell_num: parseInt(r.sell_num),
          buy_num: parseInt(r.buy_num),
          msg_num: parseInt(r.msg_num),
          album_num: parseInt(r.album_num),
          bindPhone: r.bindPhone,
        })
      }
    })
  },

  onLoad: function (options) {
    var that = this
    that.getNum()

    if (app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
      that.setData({
        userInfo: {
          avatarUrl: 'http://svn.meimaonong.com/t/header.png',
          nickName: '未获取昵称',
        }
      })
    }
    
    console.log(app.globalData.userInfo)
  },

})