
const params = require('../../utils/params')

Page({
  data: {
    left: [],
    right: [],
    hasMore: false,
    isLoading: false,
    page: 1,
    pages: 1,
    openTip: false,
    lh: 0,
    rh: 0,
    category_id: 0
  },
  getList: function () {
    var that = this
    if (that.data.openTip) return

    that.setData({
      openTip: true,
      isLoading: true
    })

    wx.request({
      url: params.api + '/v1/work/get-worklist-by-category',
      data: {
        category_id: that.data.category_id,
        page: that.data.page
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success: function (res) {

        var list = res.data.data

        list.work_list.map(function (item) {
          const h = Math.floor(345 / parseFloat(item.ratio))
          item['c_h'] = `height:${h}rpx`

          if (that.data.lh <= that.data.rh) {
            that.setData({
              lh: that.data.lh + h + 120,
              left: [...that.data.left, item]
            })
          } else {
            that.setData({
              rh: that.data.rh + h + 120,
              right: [...that.data.right, item]
            })
          }

        })
        // page++
        // pages = list.pages
        // openTip = false
        that.setData({
          page: that.data.page + 1,
          pages: list.pages,
          openTip: false
        })
        if (list.currentpage>=list.pages) {
          that.setData({
            hasMore: false
          })
        } else {
          that.setData({
            hasMore: true
          })
        }

        that.setData({
          isLoading: false
        })

      }
    })

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    //console.log('bottom', page, pages)
    if (that.data.page <= that.data.pages) {
      that.getList()
    } else if (that.data.page >= that.data.pages) {

    }
  },
  onLoad: function (options) {


    var that = this
    that.setData({
      category_id: options.category_id
    })
    var category_name = options.category_name

    that.getList(that.data.category_id)

  },
  
})