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
## Features (Current)

-  Proxy server using Express
-  In-memory caching using plain JavaScript object
-  Unique cache key generation using HTTP method + request URL
-  Checks cache before making an external API request
-  Stores and returns API response from cache if available
-  Indicates whether response came from cache or server
---

