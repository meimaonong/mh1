// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navUrls: [
      {
        link: '/pages/category/category',
        //imgUrl: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        imgUrl: 'http://www.meimaonong.com/type1.png'
      },
      {
        link: '/pages/category/category',
        //imgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        imgUrl: 'http://www.meimaonong.com/type2.png'
      },
      {
        link: '/pages/category/category',
        //imgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        imgUrl: 'http://www.meimaonong.com/type3.png'
      }
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  }

})