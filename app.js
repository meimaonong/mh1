const params = require('utils/params')
const util = require('utils/util.js')

//app.js
App({
  onLaunch: function () {
    var that = this

    that.globalData.params = params
    
    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        //console.log(res)
      }
    })

    wx.showLoading({
      mask: true,
      title: '登录中...',
    })

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wx.request({
            url: params.api + '/v1/user/wx-login',
            method: 'post',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              code: res.code
            },
            success: function (res) {
              that.globalData.sessionId = res.data.data.token
              that.globalData.tel = res.data.data.tel
              util.saveUserInfo(that)
              wx.hideLoading()
            }
          })
          
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              //console.log(res)

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    sessionId: null,
    tel: '',
  }
})