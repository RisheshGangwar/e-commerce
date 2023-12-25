const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const authRouter = require('./auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json());


app.use('/api/auth', authRouter);

let products = [
    { id: 1, name: 'Laptop - Model X', category: 'Electronics', price: 1200 },
    { id: 2, name: 'Smartphone - Model Y', category: 'Electronics', price: 800 },
    { id: 3, name: 'Wireless Headphones', category: 'Electronics', price: 120 },
    { id: 4, name: 'Digital Camera', category: 'Electronics', price: 500 },
    { id: 5, name: 'Fitness Tracker', category: 'Electronics', price: 80 },
    
    { id: 6, name: 'Leather Jacket', category: 'Fashion', price: 150 },
    { id: 7, name: 'Running Shoes', category: 'Fashion', price: 80 },
    { id: 8, name: 'Designer Sunglasses', category: 'Fashion', price: 100 },
    { id: 9, name: 'Men\'s Watch', category: 'Fashion', price: 200 },
    { id: 10, name: 'Handbag', category: 'Fashion', price: 120 },
    
    { id: 11, name: 'Coffee Maker', category: 'Home & Kitchen', price: 50 },
    { id: 12, name: 'Blender', category: 'Home & Kitchen', price: 40 },
    { id: 13, name: 'Robot Vacuum Cleaner', category: 'Home & Kitchen', price: 250 },
    { id: 14, name: 'Cookware Set', category: 'Home & Kitchen', price: 120 },
    { id: 15, name: 'Bedding Set', category: 'Home & Kitchen', price: 80 },
    
    { id: 16, name: 'Adventure Backpack', category: 'Outdoor', price: 70 },
    { id: 17, name: 'Camping Tent', category: 'Outdoor', price: 120 },
    { id: 18, name: 'Hiking Boots', category: 'Outdoor', price: 90 },
    { id: 19, name: 'Portable Grill', category: 'Outdoor', price: 60 },
    { id: 20, name: 'Binoculars', category: 'Outdoor', price: 100 },
    
    { id: 21, name: 'Novel - Mystery Thriller', category: 'Books', price: 15 },
    { id: 22, name: 'Cookbook - Healthy Recipes', category: 'Books', price: 20 },
    { id: 23, name: 'Self-Help Book', category: 'Books', price: 18 },
    { id: 24, name: 'Science Fiction Novel', category: 'Books', price: 12 },
    { id: 25, name: 'Educational Children\'s Book', category: 'Books', price: 10 },
    
    { id: 26, name: 'Desktop Monitor', category: 'Electronics', price: 250 },
    { id: 27, name: 'Gaming Console', category: 'Electronics', price: 400 },
    { id: 28, name: 'Portable Speaker', category: 'Electronics', price: 80 },
    { id: 29, name: 'Wireless Mouse', category: 'Electronics', price: 30 },
    { id: 30, name: 'External Hard Drive', category: 'Electronics', price: 70 },
    
    { id: 31, name: 'Dress - Evening Gown', category: 'Fashion', price: 180 },
    { id: 32, name: 'Men\'s Suit', category: 'Fashion', price: 250 },
    { id: 33, name: 'Running Shorts', category: 'Fashion', price: 25 },
    { id: 34, name: 'Winter Scarf', category: 'Fashion', price: 30 },
    { id: 35, name: 'Athletic Socks', category: 'Fashion', price: 10 },
    
    { id: 36, name: 'Air Purifier', category: 'Home & Kitchen', price: 120 },
    { id: 37, name: 'Robotic Lawn Mower', category: 'Home & Kitchen', price: 300 },
    { id: 38, name: 'Smart Thermostat', category: 'Home & Kitchen', price: 80 },
    { id: 39, name: 'Juicer', category: 'Home & Kitchen', price: 60 },
    { id: 40, name: 'Digital Bathroom Scale', category: 'Home & Kitchen', price: 35 },
    
    { id: 41, name: 'Camping Backpack', category: 'Outdoor', price: 100 },
    { id: 42, name: 'Portable Hammock', category: 'Outdoor', price: 40 },
    { id: 43, name: 'Water Bottle - Insulated', category: 'Outdoor', price: 20 },
    { id: 44, name: 'Pocket Knife', category: 'Outdoor', price: 15 },
    { id: 45, name: 'Camping Lantern', category: 'Outdoor', price: 25 },
    
    { id: 46, name: 'Classic Novel Collection', category: 'Books', price: 50 },
    { id: 47, name: 'Biography - Famous Personality', category: 'Books', price: 30 },
    { id: 48, name: 'Children\'s Picture Book Set', category: 'Books', price: 25 },
    { id: 49, name: 'Mystery Detective Series', category: 'Books', price: 45 },
    { id: 50, name: 'Educational Puzzle Book', category: 'Books', price: 15 },
];

let orders = [];


function isAuthenticated(req, res, next) {
    next();
}

app.get('/', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/products', isAuthenticated, (req, res) => {
    res.json(products);
});

app.post('/api/orders', isAuthenticated, (req, res) => {
    const order = req.body;
    orders.push(order);
    res.json({ success: true, message: 'Order placed successfully!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});