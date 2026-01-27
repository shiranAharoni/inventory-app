import request from 'supertest';
import app from './app.js';

describe('Inventory API Tests', () => {
  
  test('Should return 400 if quantity is missing', async () => {
    const response = await request(app)
      .post('/inventory')
      .send([{ name: "Milk" }]); 

    expect(response.status).toBe(400); 
  });

  test('Should fetch all products successfully', async () => {
    const response = await request(app).get('/product/all');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});