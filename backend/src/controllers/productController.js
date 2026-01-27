import pool from '../config/db.js';

export const addProduct = async (req, res) => {
  const { name } = req.body; 

  if (!name) {
    return res.status(400).json({ error: "invalid product, name is missing" });
  }

  try {
    const checkExist = await pool.query('SELECT * FROM products WHERE name = $1', [name]);
    
    if (checkExist.rows.length > 0) {
      return res.status(400).json({ error: "product name already exists" });
    }

    await pool.query('INSERT INTO products (name) VALUES ($1)', [name]);

    const allProducts = await pool.query('SELECT name FROM products ORDER BY id ASC');
    res.status(200).json(allProducts.rows);

  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await pool.query('SELECT name FROM products ORDER BY id ASC');
    res.status(200).json(allProducts.rows);

  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { name } = req.params; 

  try {
    await pool.query('DELETE FROM products WHERE name = $1', [name]);
    
    await pool.query('DELETE FROM inventory WHERE name = $1', [name]);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};