let cache = {};
console.log("Before proxy server start",cache);

function set(key, data) {
  cache[key] = {
    data: data,
    timestamp: Date.now(),
  };
  return cache[key];
}

module.exports = {set};