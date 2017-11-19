// pages/adress_edit/adress_edit.js
const params = require('../../utils/params')
const app = getApp()

Page({
  data: {
    address: {
      address_id: '',
      receiver: '',
      receiver_tel: '',
      address_detail: '',
    }
  },
  getAddress: function (address_id) {
    var that = this
    wx.request({
      url: params.api + '/v1/address/get-address',
      data: {
        address_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'access-token': app.globalData.sessionId
      },
      method: 'post',
      success: function (res) {
        that.setData({
          address: res.data.data
        })
      }
    })
  },
  check_tel: function(tel){
    if(tel.length <= 0) {
      return false;
    }
    var telReg = tel.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[01678]|18[0-9]|14[57])[0-9]{8}$/);
      //如果手机号码不能通过验证
      if(!telReg){
        return false;
      }
      return true;
  },
  formSubmit: function (e) {
    var that = this
    console.log(that.data.address)
    var address = Object.assign(that.data.address, e.detail.value)
    
    if (address['receiver_tel'] && address['receiver'].length > 0 && address['address_detail'].length > 0) {
      if (that.check_tel(address['receiver_tel'])) {

      } else {
        wx.showToast({
          title: '手机号格式不正确',
          image: '/public/img/icon/wrong.png',
          duration: 2000
        })
        return
      }
    } else {
      wx.showToast({
        title: '请完善信息',
        image: '/public/img/icon/wrong.png',
        duration: 2000
      })
      return
    }

    wx.request({
      url: params.api + '/v1/address/save-address',
      data: {
        ...address
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'access-token': app.globalData.sessionId
      },
      method: 'post',
      success: function (res) {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];  //上一个页面
        var addresses = prevPage.data.list
        console.log(address)
        if (address['address_id']) {
          addresses.map(function (item) {
            if (item.address_id == address['address_id']) {
              item = Object.assign(item, res.data.data)
            }
          })
        } else {
          addresses.push({ ...res.data.data, num: 0 })
        }
        console.log(addresses)
        prevPage.setData({
          list:addresses
        })
        wx.navigateBack()

      }
    })
  },
  back: function () {
    wx.navigateBack()
  },
  onLoad: function(options) {
    var that = this
    if (options.address_id) {
      that.getAddress(options.address_id)
    }
  }
  
})