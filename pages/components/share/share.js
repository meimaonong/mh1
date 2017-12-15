const app = getApp()

Component({
  properties: {
    mstyle: {
      type: String,
      value: '',
    },
    work_id: {
      type: String,
      value: '',
    }
  },
  data: {
    isShow: false,
    isShow2: false,
    share_url: '',
    imgBase: app.globalData.params.imgBase,
    imgStyle: '',
  },
  methods: {
    move(){
      return false
    },
    loadFunc(e){
      var that = this
      let w = Math.floor(e.detail.width * 588 / e.detail.height)
      if (w < 500) {
        that.setData({
          imgStyle: 'width:' + w + 'rpx'
        })
      }
    },
    toggle() {
      var that = this
      that.setData({
        isShow: !that.data.isShow
      })
    },
    toggle2() {
      var that = this
      that.setData({
        isShow2: !that.data.isShow2
      })
    },
    getAuthSave() {
      var that = this
      
      // 获取授权
      wx.getSetting({
        success(res) {
          
          if (!res.authSetting['scope.writePhotosAlbum']) {
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success() {
                // 保存到本地相册
                that.shareto()
              },
              fail() {
                if (res.authSetting['scope.writePhotosAlbum'] === false) {
                  wx.openSetting({
                    success: (res) => {
                      //console.log('openSetting success')
                      //console.log(res.authSetting)
                      if (res.authSetting['scope.writePhotosAlbum']) {
                        // 保存到本地相册
                        that.shareto()
                      }
                    },
                    fail(res) {
                      // console.log('openSetting fail')
                      // console.log(res.authSetting)
                    }
                  })
                }
              }
            })
          } else {
            // 保存到本地相册
            that.shareto()
          }
        }
      })
    },
    shareto() {
      var that = this
      that.toggle()
      that.toggle2()
      wx.showLoading({
        title: '',
        mask: true,
      })
      that.setData({
        share_url: ''
      })
      wx.request({
        url: app.globalData.params.api + '/v1/sys/get-share-work-pic',
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'access-token': app.globalData.sessionId
        },
        data: {
          work_id: that.properties.work_id
        },
        success: function (res) {
          var data = res.data.data
          /*that.setData({
            share_url: that.data.imgBase + data
          })*/
          var share_url = that.data.imgBase + data
          wx.downloadFile({
            url: share_url,
            success: function (res) {
              that.setData({
                share_url
              })
              //图片保存到本地
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success:
                function (data) {
                  wx.hideLoading()
                }
              })
            }
          })
          //wx.hideLoading()
        }
      })
      
    }
  }
})
