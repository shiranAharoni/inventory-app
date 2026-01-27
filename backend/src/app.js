import express from 'express';
import cors from 'cors';
import initDb from './config/initDb.js';
import productRoutes from './routes/productRoutes.js';
import inventoryRoutes from './routes/inventoryRoutes.js';

const app = express();
const PORT = process.env.PORT;


app.use(cors()); 
app.use(express.json()); 

app.use('/product', productRoutes);
app.use('/inventory', inventoryRoutes);

try {
    await initDb();
    console.log('Database system is ready');
} catch (err) {
    console.error('Database failed to initialize:', err);
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;