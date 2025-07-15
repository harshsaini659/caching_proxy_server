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
        const cacheKey = req.method + fullUrl+ Number(Date.now());
        const dataFromServer = await axios.get(resURL, req.body);
        console.log('Data fetched from server:', dataFromServer.data[0]);
        cacheService.set(cacheKey, dataFromServer.data);
        res.status(200).json({
            fromCache: false,
            message: "Data fetched successfully"
        })

    } catch (error) {
        console.error('Error in proxy route:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
