# Caching Proxy Server
A simple proxy server built with Node.js and Express that implements in-memory caching to optimize repeated API calls and reduce network latency.

---
## What is Caching?
**Caching** is a technique used to temporarily store frequently accessed data so that future requests for that data can be served faster without hitting the original source again.
It helps improve application performance, reduce server load, and minimize response time.
For example: Instead of calling an external API every time, we store the response once and serve it directly from the cache for subsequent requests.

---
## What is In-Memory Caching?
In-memory caching stores data directly in the server's memory (RAM), allowing extremely fast data access. In this project, I use a simple **JavaScript object** as our in-memory store to hold cached API responses.
This method is:

- Lightweight
  
- Fast
  
- Easy to implement
  
- Best suited for small-scale apps or low-traffic use-cases
  
However, since it's stored in memory, the data is lost when the server restarts.

---
## Note: Only GET Requests Are Cached
In this proxy server project, only GET requests are cached, and here's why:
GET requests are used only to fetch data from the server. They do not modify or update any data.
Since the same GET request usually returns the same response, it makes sense to store it in memory (cache) and reuse it when the same request comes again.
This approach helps to reduce server load and improves response time for repeated requests.
## Why Not Cache POST, PUT, or DELETE Requests?
POST is used to send new data to the server. The response might change with every request.

PUT or PATCH is used to update existing data. If we cache it, we might serve outdated data.

DELETE removes data from the server. If we return cached data after deletion, it can cause inconsistency.

So to keep things safe and accurate, I are only caching GET requests in this project.

---
## Cache Invalidation (In-Memory)
Cache invalidation ensures that stale (old or expired) data is not served from cache. In this project, I’ve added a time-based invalidation mechanism.
How It Works:

-Every time a response is cached, we also store the timestamp (Date.now()).

-When the same GET request comes again:

-Cache is checked for that key.

-If the timestamp is older than 1 minute(1 minute takes due to testing purpose), the cached data is considered expired.

-Expired data is ignored, and a fresh request is sent to the actual API.

-The new response is then re-cached with a new timestamp.

-This time-based invalidation ensures that users don’t get outdated responses.

-It also keeps the memory footprint clean, avoiding stale data buildup.

---

## LRU(Least Recently Used) Caching
To optimize memory usage, we implement LRU caching in our proxy server.

✅ What is LRU?

LRU (Least Recently Used) is a cache eviction policy which removes the least recently used item when the cache is full.

We maintain:

-A cache object: stores actual data

-A usageQueue array: tracks usage order of keys

How It Works:
```
Usage Queue (Oldest → Newest):

["A", "B", "C", "D", "E"]  ← 5 keys in cache

Now you access "B" → move "B" to end
["A", "C", "D", "E", "B"]

Now new request comes → "F"
=> Cache full, so evict "A" (oldest)
Final Queue After Insertion:
["C", "D", "E", "B", "F"]
```


## Features (Curent)

-  Proxy server using Express
-  In-memory caching using plain JavaScript object
-  Unique cache key generation using HTTP method + request URL
-  Checks cache before making an external API request
-  Stores and returns API response from cache if available
-  Indicates whether response came from cache or server
---

