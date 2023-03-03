const app = require('../app');
const supertest = require('supertest');
const { response } = require('../app');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const { faker } = require('@faker-js/faker');

describe('/games', () => {
    let testGame;
    beforeAll(async () => {
        const gameType = faker.word.noun();
        const gameUser = `${faker.name.firstName()} ${faker.name.lastName()}`;

        testGame = await prisma.game.create({
            data: {
                title: `${faker.word.adjective()} ${faker.word.noun()}`,
                url: `https://${faker.internet.domainName()}`,
                git: 'https://github.com',
                year: faker.date.past().getFullYear(),
                description: faker.hacker.phrase(),
                types: {
                    create: [
                        {
                            type: {
                                connectOrCreate: {
                                    where: {
                                        type: gameType,
                                    },
                                    create: {
                                        type: gameType,
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
                                        name: gameUser,
                                    },
                                    create: {
                                        name: gameUser,
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
                    expect(response.body.games).toBeInstanceOf(Array);
                });
        });
    });

    describe('GET /:gameId', () => {
        it('should return 200 OK', () => {
            return supertest(app).get(`/games/${testGame.id}`).expect(200);
        });

        it('should return game data', () => {
            return supertest(app)
                .get(`/games/${testGame.id}`)
                .then((response) => {
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
