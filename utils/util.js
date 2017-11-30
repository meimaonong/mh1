const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const params = require('params')

const saveUserInfo = (app) => {
  wx.request({
    url: params.api + '/v1/user/save-user-info',
    method: 'post',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'access-token': app.globalData.sessionId
    },
    data: {
      ...app.globalData.userInfo
    },
    success: function (res) {
      
    }
  })
}

module.exports = {
  formatTime,
  saveUserInfo,
}
