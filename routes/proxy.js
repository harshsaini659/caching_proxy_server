const express = require('express');
const router = express.Router();
const axios = require('axios');
const cacheService = require('../services/cacheService');

const BASE_URL = 'https://jsonplaceholder.typicode.com'

router.get('/*',async (req, res) => {
    try {
        const fullUrl = req.originalUrl;
        const path = req.path;
        const resURL = `${BASE_URL}${path}`;
        const cacheKey = req.method + fullUrl

        //Data getting from cache
        const dataFromCache = cacheService.get(cacheKey)
        if(dataFromCache){
            // console.log("Data from cache",dataFromCache)
            return res.status(200).json({
                fromCache: true,
                // data: dataFromCache.data,
                message: "Data fetched from cache"
            });
        }

        //Data getting from server
        const dataFromServer = await axios.get(resURL, req.body);
        cacheService.set(cacheKey, dataFromServer.data);
        res.status(200).json({
            fromCache: false,
            // data: dataFromServer.data,
            message: "Data fetched successfully"
        })

    } catch (error) {
        console.error('Error in proxy route:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/clear-cache', (req, res) => {
  try {
    cacheService.clear();
    res.status(200).json({ message: 'Cache cleared successfully' });
  } catch (error) {
    console.error('Error clearing cache:', error);
    res.status(500).send('Internal Server Error');
    
  }
});

module.exports = router;
