// pages/album_d/album_d.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  getWorks: function(album_id) {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getWorks(options.album_id)
  },

 
})