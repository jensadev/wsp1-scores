const app = require('../app');
const supertest = require('supertest');
const { response } = require('../app');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

describe('/games', () => {
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
                                        type: 'Test type',
                                    },
                                    create: {
                                        type: 'Test type',
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
                                        name: 'Test user',
                                    },
                                    create: {
                                        name: 'Test user',
                                    },
                                },
                            },
                        },
                    ],
                },
            },
        });
    });

    describe('GET /', () => {
        it('should return 200 OK', () => {
            return supertest(app).get('/games').expect(200);
        });

        it('should return an array of games', () => {
            return supertest(app)
                .get('/games')
                .then((response) => {
                    // console.log(response.body.games);
                    expect(response.body.games).toBeInstanceOf(Array);
                });
        });
    });

    describe('GET /:gameId', () => {
        it('should return 200 OK', () => {
            return supertest(app).get(`/games/${testGame.id}`).expect(200);
        });

        it('should return game data', () => {
            console.log(testGame.id);
            return supertest(app)
                .get(`/games/${testGame.id}`)
                .then((response) => {
                    console.log(response.body);
                    expect(response.body.data).toBeInstanceOf(Object);
                });
        });

        it('should return an error if gameId is not a number', () => {
            return supertest(app)
                .get('/games/abc')
                .then((response) => {
                    expect(response.body.errors[0].msg).toBe(
                        'gameId must be a number'
                    );
                });
        });
    });

    // afterAll(async () => {
    //     await prisma.gameUsers.deleteMany();
    //     await prisma.gameTypes.deleteMany();
    //     await prisma.type.deleteMany();
    //     await prisma.user.deleteMany();
    //     await prisma.game.deleteMany();
    //     await prisma.$disconnect();
    // });
});
