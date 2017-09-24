const apis = require('../../api/APIs.js')

const app = getApp()
Page({
  data: {
    user: {},
    event: {
      hashId: '',
      name: 'demo'
    },
    registedUser: {},
    checkIn: {
      result:''
    }
  },

  onLoad: function (options) {
    console.log('Global Data:', app.globalData);
    let query = app.globalData.query;
    if (app.globalData.user.nickName) {
      this.setData({
        user: app.globalData.user
      });
      this.registerUser(query, this.data.user, this);
    } else {
      wx.getUserInfo({
        success: res => {
          console.log('User info response:', res);
          app.globalData.user = res
          this.setData({
            user: res
          });
          this.registerUser(query, this.data.user, this);
        }
      })
    }
  },

  registerUser: (query, user, context) => {
    apis.register(user, (res) => {
      context.setData({
        registedUser: res.data
      });
      console.log('Register detail:', context.data);
      // success callback
      context.fetchEventDetail(query, user, context);
    },
      () => {
        // fail callback
      });
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
    // send check-in request
    apis.checkIn(event.id, this.data.registedUser.id, (res) => {
      console.log('Response:', res);
      // success callback
      this.setData({
        checkIn: {
          result: 'Check In successfully.'
        }
      })
    },
    () => {
      // fail callback
      this.setData({
        checkIn: {
          result: 'Failed to check in.'
        }
      })
    });
  }
})
