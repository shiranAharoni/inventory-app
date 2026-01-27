import pool from './db.js'; 

const initDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL
      );
    `);
    console.log('Table "products" is ready.');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS inventory (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) REFERENCES products(name) ON DELETE CASCADE,
        quantity INTEGER NOT NULL CHECK (quantity >= 0)
      );
    `);
    console.log('Table "inventory" is ready.');

  } catch (err) {
    console.error('Error initializing database:', err.message);
  }
};

export default initDb;