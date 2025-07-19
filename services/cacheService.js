let cache = {};
let usageQueue = [];
const MAX_CACHE_USAGE = 5;

function set(key, data) {

  if(cache[key]){
    usageQueue = usageQueue.filter(k => k !== key); // Remove existing key from usage queue
  }
  if(usageQueue.length >= MAX_CACHE_USAGE){
    let lruKey = usageQueue.shift(); //Remove the Least used key
    delete cache[lruKey];  //Delete from cache
  }

  cache[key] = {
    data: data,
    timestamp: Date.now(),
  };
  usageQueue.push(key); // Add the key to the end
  return cache[key];
}

function get(key){
  const cachedData = cache[key];
  if(!cachedData) return null;
  const currentTime = Date.now();
  const cachedTime = cachedData.timestamp;
  const maxTime = 1 * 60 * 1000; // 1 minute in milliseconds
  
  if(currentTime - cachedTime > maxTime){
    delete cache[key];
    usageQueue = usageQueue.filter(k => k !== key);  // Remove from usage queue if expired
    return null;
  }
  usageQueue = usageQueue.filter(k => k !== key); // phle array se remove karege 
  usageQueue.push(key); // fir usko end me add karege

  return cachedData.data;
}

function clear() {
  cache = {};
  usageQueue = [];
  console.log("Cache manually cleared");
}

module.exports = {set, get, clear};