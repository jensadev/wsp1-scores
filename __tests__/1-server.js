const app = require('../app');
const supertest = require('supertest');

describe('GET /', () => {
    it('should return 200 OK', () => {
        return supertest(app).get('/').expect(200);
    });

    it('should return a message', () => {
        return supertest(app)
            .get('/')
            .then((response) => {
                expect(response.body.msg).toBe('Api is working');
            });
    });
});
