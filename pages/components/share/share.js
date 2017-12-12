Component({
  properties: {
    
  },
  data: {
    isShow: false
  },
  methods: {
    toggle() {
      var that = this
      that.setData({
        isShow: !that.data.isShow
      })
    }
  }
})
