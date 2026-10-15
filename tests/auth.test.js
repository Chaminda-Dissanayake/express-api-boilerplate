const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');

beforeEach(() => {
    User.clearAll();
});

describe('REST API Central System Integration Core Matrices', () => {
    it('Should successfully verify system health checkpoint status', async () => {
        const res = await request(app).get('/api/health');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('status', 'Green');
    });

    it('Should successfully register a new user profile', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ name: 'Chaminda Dissanayake', email: 'dischami1@gmail.com', password: 'securePassword123' });
        
        expect(res.statusCode).toEqual(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('token');
    });

    it('Should gracefully block duplication profiles matching the same email handle', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({ name: 'Chaminda Dissanayake', email: 'dischami1@gmail.com', password: 'securePassword123' });

        const res = await request(app)
            .post('/api/auth/register')
            .send({ name: 'Chaminda Duplicate', email: 'dischami1@gmail.com', password: 'anotherPassword123' });
        
        expect(res.statusCode).toEqual(400);
        expect(res.body.success).toBe(false);
    });
});