// pages/create/index.js

const apis = require('../../api/APIs.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  bindNameChange: function (e) {
    this.setData({name: e.detail.value})
  },
  bindAddAction: function () {
    const name = this.data.name;
    if (!name) {
      wx.showToast({
        title: 'Input a name',
      })
      return
    }

    apis.createEvent(name, (res) => {
      console.log(res)
      const {hashId, name} = res.data;
      wx.setStorage({
        key: 'eventKey',
        data: {hashId, name},
        success: () => {
          wx.switchTab({
            url: '../index/index',
          })
        }
      })
    }, (err) => {


    })
  }
})