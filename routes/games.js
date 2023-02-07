const express = require('express');
const { route } = require('.');
const router = express.Router();

// GET home page.
router.get('/', function (req, res) {
    res.json({ msg: 'success', games: [] });
});

router.get('/:gameId', function (req, res) {
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