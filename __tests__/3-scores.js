const app = require('../app');
const supertest = require('supertest');
const { response } = require('../app');

describe('/scores', () => {
    beforeAll(async () => {
        try {
        } catch (error) {
            console.log(error);
        }
    });

    describe('GET /:gameid', () => {
        it('should return 200 OK', () => {
            return supertest(app).get('/scores/123456').expect(200);
        });

        it('should return an array of scores', () => {
            return supertest(app)
                .get('/scores/123456')
                .then((response) => {
                    expect(response.body.scores).toEqual([]);
                });
        });

        // it('should return an error if gameId is not provided', () => {
        //     return supertest(app)
        //         .get('/scores')
        //         .then((response) => {
        //             expect(response.body.errors[0].msg).toBe(
        //                 'gameId is required'
        //             );
        //         });
        // });

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
});
