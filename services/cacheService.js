let cache = {};

function set(key, data) {
  cache[key] = {
    data: data,
    timestamp: Date.now(),
  };
  return cache[key];
}

// function get(key){
//   const cachedData = cache[key];
//   if(cachedData){
//     return cachedData.data;
//   }
//   return null;
// }

function get(key){
  const cachedData = cache[key];
  if(!cachedData) return null;
  const currentTime = Date.now();
  const cachedTime = cachedData.timestamp;
  const maxTime = 1 * 60 * 1000; // 1 minute in milliseconds
  console.log(currentTime);
  console.log(cachedTime);
  console.log(currentTime - cachedTime);
  console.log(maxTime);
  
  if(currentTime - cachedTime > maxTime){
    delete cache[key];
    console.log(`Cache expired for key: ${key}`);
    return null;
  }
  return cachedData.data;
}

module.exports = {set, get};