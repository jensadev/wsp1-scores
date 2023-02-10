const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAllGames = async () => {
    const allGames = await prisma.game.findMany({
        include: {
            users: true,
            types: true,
            scores: true,
            classes: true,
        },
    });
    return allGames;
};

// GET home page.
router.get('/', async (req, res) => {
    const { type, year, classid, limit } = req.query;
    const errors = [];

    getAllGames()
        .then(async (games) => {
            await prisma.$disconnect();
            return res.json({
                msg: 'success',
                url: req.originalUrl,
                games: games,
            });
        })
        .catch(async (e) => {
            console.error(e);
            await prisma.$disconnect();
            return res.status(500).json({
                msg: 'fail',
                url: req.originalUrl,
                errors: [{ msg: 'internal server error' }],
            });
        });
});

router.get('/test', async (req, res) => {
    const test = await prisma.game.create({
        data: {
            title: 'Test Game',
            url: 'https://www.testgame.com',
            git: 'https://www.testgame.com',
            year: 2021,
            description: 'This is a test game',
            types: {
                create: {
                    type: 'Test Type',
                },
            },
            users: {
                create: {
                    name: 'Test User',
                },
            },
        },
    });
    res.json({
        msg: 'success',
        url: req.originalUrl,
        test,
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

//     res.json({
//         msg: 'success',
//         url: req.originalUrl,
//         gameId: gameId,
//         data: [],
//     });
// });

module.exports = router;
