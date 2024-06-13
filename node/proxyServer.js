const express = require('express');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to handle CORS and preflight requests
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Route to respond with "Hello World" on the root URL
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Proxy endpoint for all other routes
app.use('/proxy', (req, res) => {
    const url = req.url.substring(1); // Remove leading '/'
    if (!url) {
        return res.status(400).send('Bad Request: URL is missing');
    }

    req.pipe(request(url)).pipe(res);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});
