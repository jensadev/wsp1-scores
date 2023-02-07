const express = require('express');
const router = express.Router();
const promisePool = require('../utils/db');

// GET home page.
router.get('/', async (req, res) => {
    const { type, year, classid, limit } = req.query;
    const errors = [];

    const validLimit = parseInt(limit) || 10;

    try {
        const [rows] = promisePool.query(sql);

        if (rows.length > 0) {
            return res.json({ msg: 'success', url: req.originalUrl, games: rows, errors });
        } 
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'fail',
            url: req.originalUrl,
            errors: [{ msg: 'internal server error' }],
        });
    }
    return res.status(404).json({
        msg: 'fail',
        url: req.originalUrl,
        errors: [{ msg: 'games not found' }],
    });
});

router.get('/:gameId', async (req, res) => {
    const { gameId } = req.params;
    const errors = [];
    if (gameId === undefined) {
        errors.push({ msg: 'gameId is required' });
    }
    if (isNaN(gameId)) {
        errors.push({ msg: 'gameId must be a number' });
    }

    if (errors.length > 0) {
        return res
            .status(400)
            .json({ msg: 'fail', url: req.originalUrl, errors });
    }

    res.json({
        msg: 'success',
        url: req.originalUrl,
        gameId: gameId,
        data: [],
    });
});

module.exports = router;