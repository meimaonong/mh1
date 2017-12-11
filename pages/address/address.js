const params = require('../../utils/params')
const app = getApp()
Page({
  data: {
    list: null,
    select_id: '',
  },
  show_action: function (e) {
    var that = this
    var tobj = e.currentTarget.dataset
    wx.showActionSheet({
      itemList: ['编辑', '删除'],
      success: function (res) {
        if (res.tapIndex == 0) {
          that.edit(tobj.id)
        } else if (res.tapIndex == 1) {
          that.del(tobj.index, tobj.id, tobj.num)
        }
      },
      fail: function (res) {
        //console.log(res.errMsg)
      }
    })
  },
  del: function (index,address_id) {
    var that = this

    wx.showModal({
      title: '确定删除？',
      content: '',
      success: function (res) {
        if (res.confirm) {
      
          wx.request({
            url: params.api + '/v1/address/del-address',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'access-token': app.globalData.sessionId
            },
            data: {
              address_id
            },
            method: 'post',
            success: function (res) {
              that.data.list.splice(index, 1)
              that.setData({
                list: that.data.list
              })
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000
              })
            }
          })


        } else if (res.cancel) {
          //console.log('用户点击取消')
        }
      }
    })
  },
  edit: function (address_id) {
    var that = this
    that.setData({ isEdit: false })
    wx.navigateTo({
      url: '/pages/address_edit/address_edit?address_id=' + address_id,
    })
  },
  getAddressList: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: params.api + '/v1/address/get-addresslist',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'access-token': app.globalData.sessionId
      },
      method: 'post',
      success: function (res) {
        that.setData({
          list: res.data.data
        })
        wx.hideLoading()
      }
    })
  },
  sel(e){
    var that = this
    var tobj = e.currentTarget.dataset

    if (that.data.select_id) {
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];  //上一个页面
      var address = prevPage.data.address

      prevPage.setData({
        address: tobj.item
      })
      wx.navigateBack()
    }
  },
  onLoad: function (options) {
    var that = this
    that.getAddressList()

    // 从购买选择地址过来
    if (options.select_id) {
      that.setData({ select_id: options.select_id })
    }

  },
})