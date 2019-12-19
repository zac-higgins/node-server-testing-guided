const request = require('supertest');

const server = require('./server');

describe('server.js', function () {
    describe('environment', function () {
        it('should set environment to testing', function () {
            expect(process.env.DB_ENV).toBe("testing");
        })
    })

    describe('GET /', function () {
        it('should return a 200 OK', function () {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.status).toBe(200);
                })
        })
        it("should return a JSON", function () {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.type).toMatch(/json/i);
                })
        })
        it("should return {api: 'up'}", function () {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.body.api).toBe("up");
                })
        })
        it("auth example", function () {
            return request(server)
                .post('/login')
                .send({ username: 'me', password: 'pass' })
                .then(res => {
                    const token = res.body.token;
                    return request(server)
                        .get('/')
                        .set('Authorization', token)
                        .then(res => {
                            expect(Array.isArray(res.body)).toBe(true);
                        })

                })
        })
    })
}) 