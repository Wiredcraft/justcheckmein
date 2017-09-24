const baseURL = 'http://api.flyingant.me/echo';

export const fetchEventDetail = (hashId, user, successCal, failCal) => {
  wx.request({
    url: baseURL + '',
    success: (res) => {
      if (successCal) successCal(res);
    },
    fail: (res) => {
      if (failCal) failCal(res);
    }
  })
}

export const checkIn = (hashId, user, successCal, failCal) => {
  wx.request({
    url: baseURL + '',
    success: (res) => {
      if (successCal) successCal(res);
    },
    fail: (res) => {
      if (failCal) failCal(res);
    }
  })
}