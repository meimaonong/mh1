
const params = require('../../utils/params')

Page({
  data: {
    left: [],
    right: [],
    lh: 0,
    wh: 0,
  },
  getList: function (category_id) {
    var that = this

    wx.request({
      url: params.api + '/v1/work/get-worklist-by-category',
      data: {
        category_id: category_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success: function (res) {
        var list = res.data.data

        list.map(function (item) {
          item['c_h'] = Math.floor(parseInt(item.w) / parseFloat(item.ratio))

          if (that.data.lh <= that.data.rh) {
            that.setData({
              lh: that.data.lh + item['c_h'],
              left: [...that.data.left, item]
            })
          } else {
            that.setData({
              rh: that.data.lh + item['c_h'],
              right: [...that.data.right, item]
            })
          }
        })
        console.log(list)

      }
    })

  },
  onLoad: function (options) {

    var category_id = options.category_id
    var category_name = options.category_name

    wx.setNavigationBarTitle({
      title: category_name
    })

    this.getList(category_id)

  },
  
})