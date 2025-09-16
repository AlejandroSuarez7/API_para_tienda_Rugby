import express from 'express';
import cors from 'cors';
import fs from 'fs';
import bodyParser from 'body-parser';

const products = JSON.parse(fs.readFileSync('./products.json', 'utf-8'));

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Métodos API
// Obtener todos los productos
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Obtener producto por ID
app.get('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

// Crear nuevo producto
app.post('/api/products', (req, res) => {
// Actualizar producto por ID
app.put('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        // Mantener el id original
        const updatedProduct = { ...products[index], ...req.body, id };
        products[index] = updatedProduct;
        fs.writeFileSync('./products.json', JSON.stringify(products, null, 4));
        res.json(updatedProduct);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

// Eliminar producto por ID
app.delete('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        const deletedProduct = products.splice(index, 1)[0];
        fs.writeFileSync('./products.json', JSON.stringify(products, null, 4));
        res.json(deletedProduct);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});
    const newProduct = req.body;
    // Asignar un nuevo ID
    newProduct.id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    products.push(newProduct);
    fs.writeFileSync('./products.json', JSON.stringify(products, null, 4));
    res.status(201).json(newProduct);
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

// Obtener producto por ID
app.get('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`API corriendo en http://localhost:${PORT}/api/products`);
});