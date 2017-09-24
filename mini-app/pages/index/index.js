const apis = require('../../api/APIs.js')
import { qrcode } from "../../generateCode/index"
import urlDecoder from "../../utils/urlDecoder"

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
    const generateHashId = options.hashId;
    const checkInHashId = this.retriveHashId(options.q);
    if (generateHashId) {
      // generate hashId
      qrcode('qrcode', generateHashId, 450, 450);
      return
    }
    console.log('Global Data:', app.globalData);
    let query = app.globalData.query;
    // set the flag for user loading
    if (app.globalData.user.nickName) {
      this.setData({
        user: app.globalData.user
      });
      this.checkIfUserExisted(query, this.data.user, this);
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.user = res
          this.setData({
            user: res
          });
          this.checkIfUserExisted(query, this.data.user, this);
        }
      })
    }
  },

  retriveHashId: function (urlString) {
    const result = urlDecoder(urlString);
    if (result === undefined) { return }
    const hash_id = result['hashId'];
    if (hash_id === undefined) { return }
    return hash_id
  },

  checkIfUserExisted: (query, user, context) => {
    context.setData({
      loadingUser: true
    });
    apis.checkIfUserExisted(context.data.user, 
    (data) => {
      console.log('Checked User:', data);
      if (data === null) {
        context.registerUser(query, user, context)
      } else {
        context.setData({
          loadingUser: false,
          registedUser: data
        });
        console.log('Page Data:', context.data);
        context.fetchEventDetail(query, user, context);
      }
    },
    () => {

    });
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
