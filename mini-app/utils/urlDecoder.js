function decodeUrl(urlString) {
  if (urlString === undefined) return urlString;
  const url = decodeURIComponent(urlString);
  const queryString = url.split('?')[1]
  var search = /([^&=]+)=?([^&]*)/g;
  var result = {};
  var match;
  while (match = search.exec(queryString)) {
    result[match[1]] = match[2]
  }
  return result
}

module.exports = decodeUrl