const app = getApp()

Page({
  data: {
    work: null,
    address: null,
    imgBase: app.globalData.params.imgBase,
  },
  changAddress() {
    var that = this
    var address_id = that.data.address ? that.data.address.address_id : -1
    wx.navigateTo({
      url: '/pages/address/address?select_id=' + address_id,
    })
  },
  getPreWork(work_id){
    var that = this
    wx.request({
      url: app.globalData.params.api + '/v1/work/get-pre-pay',
      method: 'post',
      data: {
       work_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'access-token': app.globalData.sessionId
      },
      success: function (res) {
        var r = res.data.data
        that.setData({
          work: r.work,
          address: r.address
        })
      }
    })
  },
  createOrder() {
    var that = this
    wx.request({
      url: app.globalData.params.api + '/v1/order/create-order',
      method: 'post',
      data: {
        seller_id: that.data.work.user_id,
        work_id: that.data.work.work_id,
        receiver: that.data.address.receiver,
        receiver_tel: that.data.address.receiver_tel,
        province_id: that.data.address.province.code,
        city_id: that.data.address.city.code,
        district_id: that.data.address.district.code,
        address_detail: that.data.address.address_detail,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'access-token': app.globalData.sessionId
      },
      success: function (res) {
        var r = res.data.data

        if (res.data.code == 0) {
          wx.showToast({
            title: '购买成功',
            mask: true,
          })
          setTimeout(function(){
            wx.switchTab({
              url: '/pages/home/home',
            })
          }, 1500)

        } else {
          wx.showToast({
            title: res.data.msg,
            mask: true,
            image: '/public/img/icon/error.png'
          })
        }

      }
    })
  },
  buy() {
    var that = this
    wx.request({
      url: app.globalData.params.api + '/v1/order/check-order',
      method: 'post',
      data: {
        seller_id: that.data.work.user_id,
        work_id: that.data.work.work_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'access-token': app.globalData.sessionId
      },
      success: function (res) {
        var r = res.data.data
        
        if (res.data.code == 0) {
          that.createOrder();
        } else {
          wx.showToast({
            title: res.data.msg,
            image: '/public/img/icon/error.png'
          })
        }

      }
    })
  },
  onLoad: function (options) {
    var that = this
    var work_id = options.work_id
    if (work_id) {
      that.getPreWork(work_id)
    }
  },
  onShow() {
    if (!app.globalData.tel) {
      wx.redirectTo({
        url: '/pages/bind_phone/bind_phone',
      })
    }
  },
})