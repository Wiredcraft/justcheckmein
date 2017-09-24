const apis = require('../../api/APIs.js')

const app = getApp()
Page({
  data: {
    loadingUser: false,
    loadingEvent: false,
    user: {},
    event: {},
    registedUser: {},
    checkIn: {
      unchecked: true,
      checking: false,
      checked: false,
      result:''
    }
  },

  onLoad: function (options) {
    console.log('Global Data:', app.globalData);
    let query = app.globalData.query;
    // set the flag for user loading
    this.setData({
      loadingUser: true
    });
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
        loadingUser: false,
        registedUser: res.data
      });
      context.fetchEventDetail(query, user, context);
    },
      () => {
        context.setData({
          loadingUser: false
        });
      });
  },

  fetchEventDetail: (query, user, context) => {
    context.setData({
      loadingEvent: true
    });
    // call the fetch event detail API
    apis.fetchEventDetail(query, user, (res) => {
      // success callback
      context.setData({
        loadingEvent: false,
        event: res.data[0]
      })
    }, 
    () => {
      // fail callback
      context.setData({
        loadingEvent: false
      })
    });
  },

  onTapCheckIn: function () {
    let self = this;
    this.setData({
      checkIn: {
        unchecked: false,
        checking: true,
        checked: false,
      }
    });
    // send check-in request
    setTimeout(function() {
      apis.checkIn(self.data.event.id, self.data.registedUser.id, (res) => {
        console.log('Response:', res);
        // success callback
        self.setData({
          checkIn: {
            unchecked: false,
            checking: false,
            checked: true,
            result: 'Check In successfully.'
          }
        })
      },
        () => {
          // fail callback
          self.setData({
            checkIn: {
              unchecked: true,
              checking: false,
              checked: false,
              result: 'Failed to check in.'
            }
          })
        });
    }, 1000);
  }
})
