Component({
  properties: {
    mstyle: {
      type: String,
      value: '',
    }
  },
  data: {
    isShow: false
  },
  methods: {
    toggle() {
      console.log('inin')
      var that = this
      that.setData({
        isShow: !that.data.isShow
      })
    }
  }
})
