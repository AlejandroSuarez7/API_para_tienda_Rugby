import express from 'express';
import cors from 'cors';
import fs from 'fs';

const products = JSON.parse(fs.readFileSync('./products.json', 'utf-8'));

const app = express();
app.use(cors());

app.get('/api/products', (req, res) => {
    res.json(products);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`API corriendo en http://localhost:${PORT}/api/products`);
});