const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const authRouter = express.Router();
authRouter.use(bodyParser.json());

const db = new sqlite3.Database('mydatabase.db');
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )
`);


authRouter.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        } else if (row) {
            res.json({ success: true, message: 'Login successful!' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    });
});


authRouter.post('/register', (req, res) => {
    const { username, password } = req.body;

    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], function (err) {
        if (err) {
            res.status(400).json({ success: false, message: 'Username already exists' });
        } else {
            res.json({ success: true, message: 'Registration successful!' });
        }
    });
});

module.exports = authRouter;