import express from 'express';
import { updateInventory, getInventory, resetInventory } from '../controllers/inventoryController.js';

const router = express.Router();

router.post('/', updateInventory);
router.get('/', getInventory);
router.post('/reset', resetInventory);

export default router;