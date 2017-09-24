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
    if (app.globalData.user) {
      this.setData({
        user: app.globalData.user
      });
      this.fetchEventDetail(query, this.data.user, this);
    } else if (this.data.canIUse){
      app.userInfoReadyCallback = res => {
        this.setData({
          user: res
        })
        this.fetchEventDetail(query, this.data.user, this);
      }
    } else {
      wx.getUserInfo({
        success: res => {
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
      console.log('Response:', res);
      // success callback
      context.setData({
        event: {
          name: res.data
        }
      })
    }, 
    () => {
      // fail callback
    });
  },

  onTapCheckIn: function () {
    console.log('I click the check-in button with params:', this.data);
    let event = this.data.event;
    // send check-in request
    apis.checkIn(event.hashId, this.data.user, (res) => {
      console.log('Response:', res);
      // success callback
    },
    () => {
      // fail callback
    });
  }
})
