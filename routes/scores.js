const express = require('express');
const router = express.Router();

// GET home page
router.get('/', (req, res) => {
    return res.status(400).json({
        msg: 'fail',
        url: req.originalUrl,
        errors: [{ msg: 'gameId is required' }],
    });
});

// router.get('/:gameId', async (req, res) => {
//     const { gameId } = req.params;
//     const errors = [];
//     if (gameId === undefined) {
//         errors.push({ msg: 'gameId is required' });
//     }
//     if (isNaN(gameId)) {
//         errors.push({ msg: 'gameId must be a number' });
//     }

//     if (errors.length > 0) {
//         return res
//             .status(400)
//             .json({ msg: 'fail', url: req.originalUrl, errors });
//     }

//     try {
//         const [rows] = await promisePool.query(
//             'SELECT * FROM Scores WHERE gameId = ?',
//             [gameId]
//         );
//         if (rows.length > 0) {
//             return res.json({
//                 msg: 'success',
//                 url: req.originalUrl,
//                 gameId: gameId,
//                 scores: rows,
//             });
//         } else {
//             return res.status(404).json({
//                 msg: 'fail',
//                 url: req.originalUrl,
//                 errors: [{ msg: 'game not found' }],
//             });
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             msg: 'fail',
//             url: req.originalUrl,
//             errors: [{ msg: 'internal server error' }],
//         });
//     }
// });

module.exports = router;
