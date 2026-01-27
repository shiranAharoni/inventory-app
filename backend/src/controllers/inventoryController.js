import pool from '../config/db.js';

export const updateInventory = async (req, res) => {
  const inventoryItems = req.body; 

  if (!Array.isArray(inventoryItems)) {
    return res.status(400).json({ error: "Expected an array of items" });
  }

  try {
    for (const item of inventoryItems) {
      const { name, quantity } = item;

      if (!name || quantity === undefined) {
        return res.status(400).json({ 
          error: "Some of the inventory items are missing attribute: \"name\" or \"quantity\"" 
        });
      }

      const productCheck = await pool.query('SELECT * FROM products WHERE name = $1', [name]);
      if (productCheck.rows.length === 0) {
        return res.status(400).json({ 
          error: "Some of the inventory items are missing in the products list" 
        });
      }

      const inventoryItem = await pool.query('SELECT * FROM inventory WHERE name = $1', [name]);

      if (inventoryItem.rows.length > 0) {
        await pool.query('UPDATE inventory SET quantity = $2 WHERE name = $1', [name, quantity]);
      } else {
        await pool.query('INSERT INTO inventory (name, quantity) VALUES ($1, $2)', [name, quantity]);
      }
    }

    const allInventory = await pool.query('SELECT name, quantity FROM inventory ORDER BY id ASC');
    res.status(200).json(allInventory.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getInventory = async (req, res) => {
  try {
    const allInventory = await pool.query('SELECT name, quantity FROM inventory ORDER BY id ASC');
    res.status(200).json(allInventory.rows);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const resetInventory = async (req, res) => {
  try {
    await pool.query('DELETE FROM inventory');
    res.status(200).json([]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};