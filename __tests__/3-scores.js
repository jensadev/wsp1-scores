const app = require('../app');
const supertest = require('supertest');
const { response } = require('../app');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

describe('/scores', () => {
    let testGame;
    beforeAll(async () => {
        testGame = await prisma.game.create({
            data: {
                title: 'Test Game',
                url: 'https://www.testgame.com',
                git: 'https://www.testgame.com',
                year: 2021,
                description: 'This is a test game',
                types: {
                    create: [
                        {
                            type: {
                                connectOrCreate: {
                                    where: {
                                        type: 'Score test type',
                                    },
                                    create: {
                                        type: 'Score test type',
                                    },
                                },
                            },
                        },
                    ],
                },
                users: {
                    create: [
                        {
                            user: {
                                connectOrCreate: {
                                    where: {
                                        name: 'Score test user',
                                    },
                                    create: {
                                        name: 'Score test user',
                                    },
                                },
                            },
                        },
                    ],
                },
                scores: {
                    create: [
                        {
                            score: 100,
                            handle: '1337',
                        },
                        {
                            score: 200,
                            handle: 'tuff',
                        },
                        {
                            score: 300,
                            handle: 'jens',
                        },
                    ],
                },
            },
        });
    });

    describe('GET /:gameid', () => {
        it('should return 200 OK', () => {
            return supertest(app).get(`/scores/${testGame.id}`).expect(200);
        });

        it('should return an array of scores', () => {
            return supertest(app)
                .get(`/scores/${testGame.id}`)
                .then((response) => {
                    expect(response.body.scores).toBeInstanceOf(Array);
                });
        });

        it('should return an error if gameId is not provided', () => {
            return supertest(app)
                .get('/scores')
                .then((response) => {
                    expect(response.body.errors[0].msg).toBe(
                        'gameId is required'
                    );
                });
        });

        // it('should return an error if gameId is not a number', () => {
        //     return supertest(app)
        //         .get('/scores/abc')
        //         .then((response) => {
        //             expect(response.body.errors[0].msg).toBe(
        //                 'gameId must be a number'
        //             );
        //         });
        // });
    });
    // afterAll(async () => {
    //     await prisma.gameUsers.deleteMany();
    //     await prisma.gameTypes.deleteMany();
    //     await prisma.type.deleteMany();
    //     await prisma.user.deleteMany();
    //     await prisma.score.deleteMany();
    //     await prisma.game.deleteMany();
    //     await prisma.$disconnect();
    // });
});
