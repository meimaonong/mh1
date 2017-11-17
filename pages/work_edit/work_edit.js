// pages/work_edit/work_edit.js
const params = require('../../utils/params')

Page({

  data: {

      work: null,
      /*
      work: {
        work_id: '',
        work_title: '',
        work_img: '',
        w: '',
        h: '',
        ratio: '',
        work_price: "",
        category_id: '',
        album_id: '',
        workItems: [
          {
            work_item_id: "",
            work_id: "",
            work_item_title: "",
            work_item_des: "测试内容测试内容",
            num: 0,
            work_item_img: '',
            w: "",
            h: "",
            ratio: "",
          }
        ]
      },*/
      category: {
        category_id: -1,
        category_name: '',
      },
      album: {
        album_id: -1,
        album_title: '',
      },


    s_index: -1,

    prang: [
      
    ],
    prang2: [
      
    ],
  },
  newPic: function(e) {
    var that = this

    that.data.work = {
      work_id: '',
      work_title: '',
      work_img: '',
      w: '',
      h: '',
      ratio: '',
      work_price: "",
      category_id: '',
      album_id: '',
      workItems: [
        
      ]
    }

    wx.chooseImage({
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        let tempFilePaths = res.tempFilePaths

        wx.showLoading({
          title: '上传中',
        })

        let newItem = new Array(tempFilePaths.length)
        let num = 0
        tempFilePaths.map(function (value, index, array) {
          wx.uploadFile({
            url: params.api + '/v1/file/image-upload', //仅为示例，非真实的接口地址
            filePath: tempFilePaths[index],
            name: 'file',
            success: function (res) {
              const r = JSON.parse(res.data)
              newItem[index] = {
                work_item_title: "",
                num: index,
                work_item_img: params.api + '/' + r.data.fileUrl,
                w: r.data.w,
                h: r.data.h,
                ratio: r.data.ratio,
              }
              if (index === 0) {
                that.data.work.cover_img = params.api + '/' + r.data.fileUrl
                that.data.work.w = r.data.w
                that.data.work.h = r.data.h
                that.data.work.ratio = r.data.ratio
              }
              num++
              if (num == tempFilePaths.length) {
                that.data.work.workItems = newItem
                that.setData({
                  work: that.data.work
                })
                wx.hideLoading()
              }

            }
          })
        })

      }
    })
  },
  delItem: function (e) {
    var that = this
    const index = e.currentTarget.dataset.index
    wx.showModal({
      title: '确定删除此项？',
      content: '',
      success: function (res) {
        if (res.confirm) {
          that.data.work.workItems.splice(index, 1)
          that.setData({
            work: that.data.work
          })
        } else if (res.cancel) {
          //console.log('用户点击取消')
        }
      }
    })
  },
  changecover: function (e) {
    const img = e.currentTarget.dataset.cover
    var tarr = []
    that.data.work.workItems.map(function (item) {
      item.type == 1 ? tarr.push(item.work_item_img) : ''
    })
    var selIndex = tarr.indexOf(img)
    if (selIndex == -1) {
      tarr.unshift(img)
      selIndex = 0
    }
    wx.navigateTo({
      url: '/pages/process3/process3?selIndex=' + selIndex + '&imgs=' + JSON.stringify(tarr)
    })
  },
  changeimg: function (e) {
    const img = e.currentTarget.dataset.img
    const index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/process2/process2?index=' + index + '&img=' + img
    })
  },
  editTxt: function (e) {
    const txt = e.currentTarget.dataset.txt
    const index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/process/process?type=2&index=' + index + '&txt=' + txt
    })
  },
  editTit: function (e) {
    const txt = e.currentTarget.dataset.txt
    wx.navigateTo({
      //url: '/pages/process/process?type=1&txt=' + txt
      url: '/pages/go/go?id=123'
    })
  },
  addOp: function (e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      s_index: index
    })
  },
  addTxt: function (e) {
    var that = this
    const index = e.currentTarget.dataset.index
    that.data.work.workItems.splice(index + 1, 0, { type: 2, img_url: 'http://svn.meimaonong.com/type1.png', txt: 'txt2' })
    that.setData({
      work: that.data.work,
      s_index: -1
    })
  },
  m_up: function (e) {
    var that = this
    const index = e.currentTarget.dataset.index
    var tmp = that.data.work.workItems[index - 1]
    that.data.work.workItems[index - 1] = that.data.work.workItems[index]
    that.data.work.workItems[index] = tmp
    that.setData({
      work: that.data.work
    })
  },
  m_down: function (e) {
    var that = this
    const index = e.currentTarget.dataset.index
    var tmp = that.data.work.workItems[index + 1]
    that.data.work.workItems[index + 1] = that.data.work.workItems[index]
    that.data.work.workItems[index] = tmp
    that.setData({
      work: that.data.work
    })
  },
  addPic: function (e) {

    var that = this
    const mindex = e.currentTarget.dataset.index

    wx.chooseImage({
      count: 9,
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        let tempFilePaths = res.tempFilePaths

        that.setData({
          s_index: -1
        })

        wx.showLoading({
          title: '上传中',
        })

        let newItem = new Array(tempFilePaths.length)
        let num = 0
        tempFilePaths.map(function (value, index, array) {
          wx.uploadFile({
            url: params.api + '/v1/file/image-upload', //仅为示例，非真实的接口地址
            filePath: tempFilePaths[index],
            name: 'file',
            success: function (res) {
              const r = JSON.parse(res.data)
              newItem[index] = { type: 1, img_url: params.api + '/' + r.data.fileUrl, txt: 'txt1' }
              num++
              if (num == tempFilePaths.length) {
                that.data.work.workItems.splice(mindex + 1, 0, ...newItem)
                that.setData({
                  work: that.data.work,
                  s_index: -1
                })
                wx.hideLoading()
              }


            }
          })
        })

      }
    })
  },
  getCategorys: function() {
    var that = this

    wx.request({
      url: params.api + '/v1/category/get-categorylist',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success: function (res) {
        that.setData({
          prang: res.data.data
        })
      }
    })
  },
  getAlbums: function () {
    var that = this

    wx.request({
      url: params.api + '/v1/album/get-albums',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        user_id: 1
      },
      method: 'post',
      success: function (res) {
        that.setData({
          prang2: res.data.data
        })

      }
    })
  },
  onLoad: function (options) {
    var that = this
    that.getCategorys()
    that.getAlbums()
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