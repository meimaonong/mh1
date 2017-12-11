
const app = getApp()

Page({
  data: {
    address: {
      address_id: '',
      receiver: '',
      receiver_tel: '',
      address_detail: '',
    },
    btn_txt: '',

    multiIndex: [0, 0, 0],

    province_index: 0,

    selProvince: {},
    selCity: {},
    selDistrict: {},

    initGet: false,

    objectMultiArray: [
      [], 
      [], 
      []
    ],

  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var that = this
    var val = e.detail.value
    that.setData({
      selProvince: that.data.objectMultiArray[0][val[0]],
      selCity: that.data.objectMultiArray[1][val[1]],
      selDistrict: that.data.objectMultiArray[2][val[2]],
    })
  },
  bindMultiPickerColumnChange: function (e) {
    var that = this
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    if (e.detail.column == 0) {
      that.setData({
        objectMultiArray: [
          that.data.objectMultiArray[0],
          [],
          []
        ]
      })

      that.setData({
        province_index: e.detail.value
      })
      that.initAddress(that.data.objectMultiArray[0][e.detail.value].id)
      
    }

    if (e.detail.column == 1) {
      that.setData({
        objectMultiArray: [
          that.data.objectMultiArray[0],
          that.data.objectMultiArray[1],
          []
        ]
      })

      that.initAddress(that.data.objectMultiArray[0][that.data.province_index].id, that.data.objectMultiArray[1][e.detail.value].id)
      
    }
  },

  getAddress: function (address_id) {
    var that = this
    wx.request({
      url: app.globalData.params.api + '/v1/address/get-address',
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
        that.initAddress('', '', res.data.data.province_id, res.data.data.city_id)
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
    //console.log(that.data.address)
    var address = Object.assign(that.data.address, e.detail.value)
    
    if (address['receiver_tel'] && address['receiver'].length > 0 && address['address_detail'].length > 0 && that.data.selProvince.id && that.data.selCity.id && that.data.selDistrict.id) {
      if (that.check_tel(address['receiver_tel'])) {

      } else {
        wx.showToast({
          title: '手机号格式不正确',
          image: '/public/img/icon/error.png',
          duration: 2000
        })
        return
      }
    } else {
      wx.showToast({
        title: '请完善信息',
        image: '/public/img/icon/error.png',
        duration: 2000
      })
      return
    }

    wx.request({
      url: app.globalData.params.api + '/v1/address/save-address',
      data: {
        ...address,
        province_id: that.data.selProvince.id,
        city_id: that.data.selCity.id,
        district_id: that.data.selDistrict.id,
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

        res.data.data['province'] = that.data.selProvince
        res.data.data['city'] = that.data.selCity
        res.data.data['district'] = that.data.selDistrict
        
        if (address['address_id']) {
          addresses.map(function (item) {
            if (item.address_id == address['address_id']) {
              item = Object.assign(item, res.data.data)
            }
          })
        } else {
          addresses.unshift({ ...res.data.data })
        }
        
        prevPage.setData({
          list:addresses
        })
        wx.navigateBack()

      }
    })
  },

  initAddress(province_code, city_code, filter_province_code, filter_city_code) {
    var that = this

    wx.request({
      url: app.globalData.params.api + '/v1/district/get-group-district',
      data: {
        province_code: province_code ? province_code : '',
        city_code: city_code ? city_code : '',
        filter_province_code: filter_province_code ? filter_province_code : '',
        filter_city_code: filter_city_code ? filter_city_code : '',
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'access-token': app.globalData.sessionId
      },
      method: 'post',
      success: function (res) {
        res.data.data.province.length > 0 ? that.data.objectMultiArray[0] = res.data.data.province : ''
        res.data.data.city.length > 0 ? that.data.objectMultiArray[1] = res.data.data.city : ''
        that.data.objectMultiArray[2] = res.data.data.district
        that.setData({
          objectMultiArray: that.data.objectMultiArray
        })

        // 有address_id初始化
        if (that.data.initGet) {
          that.setData({initGet: false})
          let t1, t2, t3
          res.data.data.province.map(function(val, index, arr){
            if (val['id'] == that.data.address.province_id) {
              t1 = index
              that.setData({
                selProvince: val
              })
            }
          })
          res.data.data.city.map(function (val, index, arr) {
            if (val['id'] == that.data.address.city_id) {
              t2 = index
              that.setData({
                selCity: val
              })
            }
          })
          res.data.data.district.map(function (val, index, arr) {
            if (val['id'] == that.data.address.district_id) {
              t3 = index
              that.setData({
                selDistrict: val
              })
            }
          })
          console.log(t1, t2, t3)
          that.setData({
            multiIndex: [t1, t2, t3]
          })
        }
        
      }
    })
  },

  onLoad: function(options) {
    var that = this
    if (options.address_id) {
      that.setData({ initGet: true})
      that.getAddress(options.address_id)
      wx.setNavigationBarTitle({
        title: '编辑收货地址'
      })
      that.setData({
        btn_txt: '保存'
      })
    } else {
      that.initAddress()
      wx.setNavigationBarTitle({
        title: '新增收货地址'
      })
      that.setData({
        btn_txt: '新增'
      })
    }
  }
  
})