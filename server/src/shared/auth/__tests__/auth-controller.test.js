import request from 'supertest';
import app from '../../app';
import UserModel from '../../modules/user/models/user-model.js';
import AdminModel from '../../modules/admin/models/admin-model.js';
import mongoose from 'mongoose';

jest.mock('../google-oath-config.js', () => ({
  oauthClient: {
    getToken: jest.fn(),
    setCredentials: jest.fn(),
  },
}));

describe('Auth Controller', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterEach(async () => {
    await UserModel.deleteMany({});
    await AdminModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('Register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        role: 'user',
      };

      const response = await request(app).post('/api/register').send(userData);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User registration success');
      expect(response.body.data.user.email).toBe(userData.email);
      expect(response.body.data.token).toBeDefined();
    });

    it('should return error for already existing user', async () => {
      const userData = {
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        role: 'user',
      };

      await request(app).post('/api/register').send(userData);
      const response = await request(app).post('/api/register').send(userData);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('User already exists. Please Log In');
    });

    it('should return error if passwords do not match', async () => {
      const userData = {
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123',
        confirmPassword: 'differentpassword',
        role: 'user',
      };

      const response = await request(app).post('/api/register').send(userData);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Passwords do not match');
    });
  });

  describe('Login', () => {
    it('should login successfully with custom method', async () => {
      const userData = {
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        role: 'user',
      };

      await request(app).post('/api/register').send(userData);
      const loginData = {
        type: 'custom',
        role: 'user',
        email: userData.email,
        password: userData.password,
      };

      const response = await request(app).post('/api/login').send(loginData);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('User login successful');
      expect(response.body.data.token).toBeDefined();
    });

    it('should return error for invalid credentials', async () => {
      const loginData = {
        type: 'custom',
        role: 'user',
        email: 'nonexistent@example.com',
        password: 'wrongpassword',
      };

      const response = await request(app).post('/api/login').send(loginData);

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Invalid credentials');
    });
  });
});
