const base64 = require('../utils/base64js.min.js');
const baseURL = 'http://localhost:3000/api/';

export const fetchEventDetail = (hashId, user, successCal, failCal) => {
  wx.request({
    method: 'GET',
    url: baseURL + 'events/?filter' + encodeURI("{'where': {'hashId':'" + hashId+ "'}}"),
    success: (res) => {
      if (successCal) successCal(res);
    },
    fail: (res) => {
      if (failCal) failCal(res);
    }
  })
}

export const checkIfUserExisted = (user, successCal, failCal) => {
  wx.request({
    method: 'get',
    url: baseURL + 'users/?filter' + encodeURI("{'where': {'openid':'" + base64.fromByteArray(encodeURI(user.userInfo.nickName)) + "'}}"),
    success: (res) => {
      if (successCal) {
        if (res.data.length > 0) {
          successCal(res.data[0]);
        } else {
          successCal(null)
        }
      }
    },
    fail: (res) => {
      if (failCal) failCal(null);
    }
  })
}

export const register = (user, successCal, failCal) => {
  wx.request({
    method: 'POST',
    url: baseURL + 'users',
    data: {
      openid: base64.fromByteArray(encodeURI(user.userInfo.nickName)),
      nickName: user.userInfo.nickName,
      avatarUrl: user.userInfo.avatarUrl, 
      city: user.userInfo.city
    },
    success: (res) => {
      if (successCal) successCal(res);
    },
    fail: (res) => {
      if (failCal) failCal(res);
    }
  })
}

export const checkIn = (eventId, userId, successCal, failCal) => {
  wx.request({
    method: 'PUT',
    url: baseURL + 'events/' + eventId + '/users/rel/' + userId,
    success: (res) => {
      if (successCal) successCal(res);
    },
    fail: (res) => {
      if (failCal) failCal(res);
    }
  })
}