// pages/work_edit/work_edit.js
Page({

  data: {
    result: {
      work: null,
      category: {
        category_id: -1,
        category_name: '',
      },
      album: {
        album_id: -1,
        album_title: '',
      }
    },
    prang: [
      {
        category_id: 1,
        category_name: 'z名称1',
      },
      {
        category_id: 2,
        category_name: 'z名称2',
      }
    ],
    prang2: [
      {
        album_id: 1,
        album_title: 'a名称1',
      },
      {
        album_id: 2,
        album_title: 'a名称2',
      }
    ],
  },
  onLoad: function (options) {
  
  },

  bindPickerChange: function (e) {
    var that = this
    that.data.result.category = that.data.prang[e.detail.value]
    this.setData({
      result: that.data.result
    })
  },
  bindPickerChange2: function (e) {
    var that = this
    that.data.result.album = that.data.prang2[e.detail.value]
    this.setData({
      result: that.data.result
    })
  },
  
})