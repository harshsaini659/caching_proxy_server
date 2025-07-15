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

        const dataFromServer = await axios.get(resURL, req.body);
        res.status(200).json({
            data: dataFromServer.data,
            message: "Data posted successfully"
        })

    } catch (error) {
        console.error('Error in proxy route:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
