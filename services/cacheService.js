let cache = {};

function set(key, data) {
  cache[key] = {
    data: data,
    timestamp: Date.now(),
  };
  return cache[key];
}

function get(key){
  const cachedData = cache[key];
  if(cachedData){
    return cachedData
  }
  return null;
}

module.exports = {set, get};