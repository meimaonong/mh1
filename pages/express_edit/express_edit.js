const app = getApp()
Page({
  data: {
    order_id: 0,
    index: -1,
    expressno: '',

    selIndex: -1,

    expresses: [],
    express: {
      express_id: -1,
      express_name: '',
    },
  },
  formSubmit: function (e) {
    var that = this
    var express_no = e.detail.value.express_no

    if (!express_no || !that.data.express.express_id) {
      wx.showToast({
        title: '请完善内容',
        image: '/public/img/icon/error.png'
      })
      return
    }

    var that = this

    wx.request({
      url: app.globalData.params.api + '/v1/order/save-express',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'access-token': app.globalData.sessionId
      },
      data:{
        order_id: that.data.order_id,
        express_id: that.data.express.express_id,
        express_no: express_no
      },
      success: function (res) {
        var r = res.data.data
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];  //上一个页面
        var list = prevPage.data.list
        list.work_list[that.data.index]['express_no'] = express_no
        list.work_list[that.data.index]['express_id'] = that.data.express.express_id
        list.work_list[that.data.index]['express_name'] = that.data.express.express_name
        //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
        prevPage.setData({
          list: list
        })
        wx.navigateBack()
      }
    })

    
  },
  getExpresses(){
    var that = this

    wx.request({
      url: app.globalData.params.api + '/v1/order/get-expresses',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'access-token': app.globalData.sessionId
      },
      success: function (res) {
        var r = res.data.data
        that.setData({
          expresses: r
        })
        console.log(that.data.express.express_id, r)
        if (that.data.express.express_id) {
           r.map(function(val,index,arr){
             if (val['express_id'] == that.data.express.express_id) {
               console.log(index)
               that.setData({
                 
                 express: {
                   express_id: val['express_id'],
                   express_name: val['express_name'],
                 }
               })
             }
           })
        }
      }
    })
  },
  bindPickerChange: function (e) {
    var that = this
    that.data.express = that.data.expresses[e.detail.value]
    console.log(that.data.express)
    this.setData({
      express: that.data.express
    })
  },

  onLoad: function (options) {
    var that = this

    console.log(options)
    that.setData({
      order_id: options.id,
      index: options.index,
      expressno: options.expressno,
      express: {
        express_id: options.expressid,
        express_name: ''
      }
    })
    
    that.getExpresses()
    wx.setNavigationBarTitle({
      title: '编辑快递信息'
    })

  }
})