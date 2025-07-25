const express = require('express');
const router = express.Router();
const cacheService = require('../services/cacheService');

/**
 * @swagger
 * /admin/clear-cache:
 *   delete:
 *     summary: Manually clear the in-memory cache
 *     description: This endpoint is used by admin or system to manually clear the entire cache.
 *     responses:
 *       200:
 *         description: Cache cleared successfully
 */

router.delete('/clear-cache', (req, res) => {
  try {
    cacheService.clear();
    res.status(200).json({ message: 'Cache cleared successfully' });
  } catch (error) {
    console.error('Error clearing cache:', error);
    res.status(500).send('Internal Server Error');
    
  }
});

/**
 * @swagger
 * /admin/cache-info:
 *   get:
 *     summary: Get current cache metadata
 *     description: >
 *       Returns current cache size, LRU key order, and the cached data.
 *     responses:
 *       200:
 *         description: Cache info returned
 *         content:
 *           application/json:
 *             example:
 *               maxCacheSize: 5
 *               currentCacheSize: 3
 *               keysInLRUOrder: ["A", "B", "C"]
 *               cacheData:
 *                 A: { data: {...}, timestamp: 123456789 }
 */
router.get('/cache-info', (req, res) => {
  const info = cacheService.getCacheInfo();
  res.status(200).json(info);
});

module.exports = router;
