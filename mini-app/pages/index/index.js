const apis = require('../../api/APIs.js')

const app = getApp()
Page({
  data: {
    user: {},
    event: {
      hashId: '',
      name: 'demo'
    }
  },

  onLoad: function (options) {
    console.log('Global Data:', app.globalData);
    let query = app.globalData.event.query;
    if (app.globalData.user.nickName) {
      this.setData({
        user: app.globalData.user
      });
      this.fetchEventDetail(query, this.data.user, this);
    } else {
      wx.getUserInfo({
        success: res => {
          console.log('User info response:', res);
          app.globalData.user = res
          this.setData({
            user: res
          });
          this.fetchEventDetail(query, this.data.user, this);
        }
      })
    }
  },

  fetchEventDetail: (query, user, context) => {
    // call the fetch event detail API
    apis.fetchEventDetail(query, user, (res) => {
      console.log('Fetch event detail:', res);
      // success callback
      context.setData({
        event: res.data[0]
      })
    }, 
    () => {
      // fail callback
    });
  },

  onTapCheckIn: function () {
    console.log('I click the check-in button with params:', this.data);
    let event = this.data.event;
    let user = this.data.user;
    // send check-in request
    apis.checkIn(event.hashId, user, (res) => {
      console.log('Response:', res);
      // success callback
    },
    () => {
      // fail callback
    });
  }
})
