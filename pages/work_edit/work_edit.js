const app = getApp()

Page({

  data: {
    work: [],
    isEdit: true,
    category: {
      category_id: -1,
      category_name: '',
    },
    imgBase: app.globalData.params.imgBase,
    album: {
      album_id: -1,
      album_title: '',
    },
    s_index: -1,
    categorys: [],
    albums: [],

    tip: false,
    tip_txt: '',
    time: null,

    index1: 0,
    index2: 0,
  },
  valid: function() {
    var that = this

    if (!that.data.work.work_title) {
      wx.showToast({
        title: '请输入标题',
        image: '/public/img/icon/wrong.png',
        duration: 2000
      })
      return false
    }

    var work_price = that.data.work.work_price
  
    if (!work_price || work_price%1 != 0) {
      wx.showToast({
        title: '请输入正确价格',
        image: '/public/img/icon/wrong.png',
        duration: 2000
      })
      return false
    }

    if (that.data.album.album_id <= 0) {
      wx.showToast({
        title: '请选择专辑',
        image: '/public/img/icon/wrong.png',
        duration: 2000
      })
      return false
    }

    if (that.data.category.category_id <= 0) {
      wx.showToast({
        title: '请选择分类',
        image: '/public/img/icon/wrong.png',
        duration: 2000
      })
      return false
    }

    return true

  },
  save: function() {
    var that = this

    if (that.valid()) {
      
      wx.showLoading({
        title: '保存中',
      })

      that.data.work.category_id = that.data.category.category_id
      that.data.work.album_id = that.data.album.album_id
      
      
      wx.request({
        url: app.globalData.params.api + '/v1/work/save-work',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'access-token': app.globalData.sessionId
        },
        data: {
          work: JSON.stringify(that.data.work)
        },
        method: 'post',
        success: function (res) {
          wx.hideLoading()
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000
          })
          wx.redirectTo({
            url: '/pages/work_p/work_p?work_id='+res.data.data,
          })
        }
      })
    }
  },
  pre: function() {
    var that = this
    wx.navigateTo({
      url: '/pages/work_p2/work_p2?work=' + JSON.stringify(that.data.work),
    })
  },
  priceinput: function(e) {
    var work_price = e.detail.value
    this.data.work.work_price = work_price
    this.setData({
      work
    })
  },
  zj_add: function(e) {
    wx.navigateTo({
      url: '/pages/album_edit/album_edit',
    })
  },
  newPic: function(e) {
    var that = this

    that.data.work = {
      work_id: '',
      work_title: '',
      work_img_id: '',
      img: {},
      work_w: '',
      work_h: '',
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
            url: app.globalData.params.api + '/v1/file/image-upload',
            header: {
              'access-token': app.globalData.sessionId
            },
            filePath: tempFilePaths[index],
            name: 'file',
            success: function (res) {
              const r = JSON.parse(res.data)
              newItem[index] = {
                work_item_title: "",
                num: index,
                work_item_des: '',
                img: {
                  img_name: r.data.img_name,
                  img_url: r.data.img_url,
                  img_width: r.data.img_width,
                  img_height: r.data.img_height,
                  img_ratio: r.data.img_ratio,
                }
              }
              if (index === 0) {
                that.data.work.img = Object.assign(that.data.work.img, {
                  img_name: r.data.img_name,
                  img_url: r.data.img_url,
                  img_width: r.data.img_width,
                  img_height: r.data.img_height,
                  img_ratio: r.data.img_ratio,
                })
              }
              num++
              if (num == tempFilePaths.length) {
                that.data.work.workItems = newItem
                that.setData({
                  work: that.data.work,
                  isEdit: true
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

    if (that.data.work.workItems.length == 1) {
      wx.showToast({
        title: '至少保留一项',
        image: '/public/img/icon/wrong.png',
        duration: 2000
      })
      return
    }

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
    var that = this
    var img = e.currentTarget.dataset.cover
    var tarr = []
    var wh = []

    that.data.work.workItems.map(function (item) {
      tarr.push(that.data.imgBase + item.img.img_url + item.img.img_name)
    })

    var selIndex = tarr.indexOf(img)
    if (selIndex == -1) {
      tarr.unshift(img)
      selIndex = 0
    }
    wx.navigateTo({
      url: '/pages/changecover/changecover?selIndex=' + selIndex + '&imgs=' + JSON.stringify(tarr)
    })
  },
  changeimg: function (e) {
    const img = e.currentTarget.dataset.img
    const index = e.currentTarget.dataset.index
    const ratio = e.currentTarget.dataset.ratio
    wx.navigateTo({
      url: '/pages/process2/process2?index=' + index + '&img=' + img + '&ratio=' + ratio
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
      url: '/pages/process/process?type=1&txt=' + txt
    })
  },
  addOp: function (e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      s_index: index
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
    var index = e.currentTarget.dataset.index
    var tmp = that.data.work.workItems[index + 1]
    that.data.work.workItems[index + 1] = that.data.work.workItems[index]
    that.data.work.workItems[index] = tmp
    that.setData({
      work: that.data.work
    })
  },
  addPic: function (e) {

    var that = this
    var mindex = e.currentTarget.dataset.index

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
            url: app.globalData.params.api + '/v1/file/image-upload',
            header: {
              'access-token': app.globalData.sessionId
            },
            filePath: tempFilePaths[index],
            name: 'file',
            success: function (res) {
              const r = JSON.parse(res.data)
              newItem[index] = {
                work_item_title: "",
                work_item_des: "",
                num: index,
                img: {
                  img_name: r.data.img_name,
                  img_url: r.data.img_url,
                  img_width: r.data.img_width,
                  img_height: r.data.img_height,
                  img_ratio: r.data.img_ratio,
                }
              }
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
      url: app.globalData.params.api + '/v1/category/get-categorylist',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'access-token': app.globalData.sessionId
      },
      method: 'post',
      success: function (res) {
        that.setData({
          categorys: res.data.data
        })
      }
    })
  },
  getAlbums: function () {
    var that = this

    wx.request({
      url: app.globalData.params.api + '/v1/album/get-albums',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'access-token': app.globalData.sessionId
      },
      method: 'post',
      success: function (res) {
        that.setData({
          albums: res.data.data
        })

      }
    })
  },
  getWork: function(work_id){
    var that = this

    wx.request({
      url: app.globalData.params.api + '/v1/work/get-work',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'access-token': app.globalData.sessionId
      },
      data: {
        work_id
      },
      method: 'post',
      success: function (res) {
        that.setData({
          work: res.data.data,
          category: {
            category_id: res.data.data.category_id,
            category_name: res.data.data.category_name
          },
          album: {
            album_id: res.data.data.album_id,
            album_title: res.data.data.album_title
          },
        })

      }
    })
  },
  bindPickerChange: function (e) {
    var that = this
    that.data.category = that.data.categorys[e.detail.value]
    
    this.setData({
      category: that.data.category
    })
  },
  bindPickerChange2: function (e) {
    var that = this
    that.data.album = that.data.albums[e.detail.value]
    console.log(e.detail.value)
    this.setData({
      album: that.data.album
    })
  },
  onLoad: function (options) {
    var that = this

    if (options.work_id) {
      that.getWork(options.work_id)
    } else {
      that.setData({
        isEdit: true
      })
    }
    
    that.getCategorys()
    that.getAlbums()
  }
})