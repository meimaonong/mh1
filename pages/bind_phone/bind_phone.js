const app = getApp()

Page({
  data: {
    isSend: false,
    seconds: 60,
    phone: '',
  },
  phoneinput(e) {
    var that = this
    that.setData({phone: e.detail.value})
  },
  formSubmit: function (e) {
    var that = this
    var tel = e.detail.value.tel
    var code = e.detail.value.code

    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (!myreg.test(tel)) {
      wx.showToast({
        title: '请输入正确手机号',
        image: '/public/img/icon/error.png'
      })
      return
    }

    var reg = new RegExp(/^\d{6}$/);
    if (!reg.test(code)) {
      wx.showToast({
        title: '请输入正确验证码',
        image: '/public/img/icon/error.png'
      })
      return
    }
    wx.showLoading({
      title: '正在绑定',
      mask: true,
    })
    wx.request({
      url: app.globalData.params.api + '/v1/user/bind-phone',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'access-token': app.globalData.sessionId
      },
      data: {
        tel,
        code
      },
      success: function (res) {
        wx.hideLoading()
        if (res.data.code == 0) {
          wx.reLaunch({
            url: '/pages/my/my',
          })
        }
        
      }
    })


  },
  getCode() {
    var that = this
    if (that.data.isSend) {
      return
    }

    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (!myreg.test(that.data.phone)) {
      wx.showToast({
        title: '请输入正确手机号',
        image: '/public/img/icon/error.png'
      })
      return
    } 

    that.setData({ isSend: true })

    wx.request({
      url: app.globalData.params.api + '/v1/sms/send-sms',
      data: {
        tel: that.data.phone
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'access-token': app.globalData.sessionId
      },
      method: 'post',
      success: function (res) {
        let s = setInterval(function(){
          console.log('in', that.data.seconds)
          let seconds = that.data.seconds - 1
          that.setData({
            seconds
          })
          
          if (that.data.seconds == 0) {
            that.setData({ isSend: false })
            clearInterval(s)
          }
        }, 1000)
      }
    })

  },
  onLoad: function (options) {
  
  }
})