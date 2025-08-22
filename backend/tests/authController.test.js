const request = require('supertest');
const app = require('../server');
const User = require('../models/User');

describe('Auth Controller', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  test('Should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
  });

  test('Should login existing user', async () => {
    // D'abord créer un utilisateur
    await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });

    // Puis tester la connexion
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
  });
});