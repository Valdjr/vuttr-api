const request = require('supertest')
const app = require('../../src/app')
const userClass = require('../../src/Model/User')

describe('Authentication', () => {
    it('should authenticate with valid credentials', async () => {
        const user = {
            name: 'valdir',
            email: 'valdir@gmail.com',
            password: '123123'
        };
        await userClass.create(user)

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: user.password
            })

        expect(response.status).toBe(200)
    })

    it('should not authenticate with invalid credentials', async () => {
        const user = {
            email: 'valdir@hotmail.com',
            password: '123567'
        };

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: user.password
            })

        expect(response.status).toBe(401)
    })

    it('should receive a JWT when authenticated', async () => {
        const user = {
            email: 'valdir@gmail.com',
            password: '123123'
        };

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: user.password
            })

        expect(response.body).toHaveProperty('token')
    })
})
