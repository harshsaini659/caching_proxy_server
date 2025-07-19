const express = require('express');
const router = express.Router();
const axios = require('axios');
const cacheService = require('../services/cacheService');

const BASE_URL = 'https://jsonplaceholder.typicode.com'

/**
 * @swagger
 * components:
 *   schemas:
 *     CacheResponse:
 *       type: object
 *       properties:
 *         fromCache:
 *           type: boolean
 *           description: Whether data was served from cache
 *         message:
 *           type: string
 *           description: Response message
 *         data:
 *           type: object
 *           description: The actual data (optional)
 * 
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     description: Proxies request to JSONPlaceholder API and caches the response with LRU logic
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of posts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CacheResponse'
 *       500:
 *         description: Internal server error
 * 
 * /api/posts/{id}:
 *   get:
 *     summary: Get single post by ID
 *     description: Proxies request to JSONPlaceholder API and caches the response
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Single post data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CacheResponse'
 *       500:
 *         description: Internal server error
 *
 * /api/posts/{id}/comments:
 *   get:
 *     summary: Get comments for a specific post
 *     description: Proxies request to JSONPlaceholder API and caches the response
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Comments for the post retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CacheResponse'
 *       500:
 *         description: Internal server error
 * 
 * /api/comments:
 *   get:
 *     summary: Get all comments
 *     description: Proxies request to JSONPlaceholder API and caches the response
 *     tags: [Comments]
 *     parameters:
 *       - in: query
 *         name: postId
 *         schema:
 *           type: integer
 *         description: Filter comments by post ID
 *     responses:
 *       200:
 *         description: Comments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CacheResponse'
 *       500:
 *         description: Internal server error
 * 
 * /api/albums:
 *   get:
 *     summary: Get all albums
 *     description: Proxies request to JSONPlaceholder API and caches the response
 *     tags: [Albums]
 *     responses:
 *       200:
 *         description: Albums retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CacheResponse'
 *       500:
 *         description: Internal server error
 * 
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Proxies request to JSONPlaceholder API and caches the response
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CacheResponse'
 *       500:
 *         description: Internal server error
 */

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



module.exports = router;
