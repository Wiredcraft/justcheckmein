import {code128} from './codes/barcode_code128'
import qrcodeCode from './codes/qrcode'

const convert_length = (length) => {
  return Math.round(wx.getSystemInfoSync().windowWidth * length / 750);
}

function barcode(id, code, width, height) {
  code128(wx.createCanvasContext(id), code, convert_length(width), convert_length(height))
}

function qrcode(id, code, width, height) {
  qrcodeCode.draw(code, {
    ctx: wx.createCanvasContext(id),
    width: convert_length(width),
    height: convert_length(height)
  })
}

module.exports = {
  barcode: barcode,
  qrcode: qrcode
}