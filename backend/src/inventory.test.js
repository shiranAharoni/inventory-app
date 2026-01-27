import request from 'supertest';
import app from './app.js';

describe('Inventory Management System - Integration Tests', () => {

  // קבוצה ראשונה: בדיקות מוצרים (Products)
  describe('Product API', () => {
    test('Should fetch all products successfully', async () => {
      const response = await request(app).get('/product/all');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    test('Should return 400 for invalid product scheme', async () => {
      const response = await request(app)
        .put('/product')
        .send({}); // שליחת אובייקט ריק ללא name
      expect(response.status).toBe(400);
    });
  });

  // קבוצה שנייה: בדיקות מלאי (Inventory)
  describe('Inventory API', () => {
    test('Should return 400 if some item name is missing', async () => {
      const response = await request(app)
        .post('/inventory')
        .send([{ quantity: 5 }]); // חסר name
      expect(response.status).toBe(400);
    });

    test('Should reset inventory successfully', async () => {
      const response = await request(app).post('/inventory/reset');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });
});