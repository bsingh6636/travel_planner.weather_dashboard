const express = require('express');
const request = require('request');
const morgan = require('morgan');

const app = express();

// Middleware for logging
app.use(morgan('combined'));

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

// Root route to print a message on the screen
app.get('/', (req, res) => {
    res.send('Welcome to the Proxy Server!');
});

// Proxy endpoint for all other routes
app.use('/proxy', (req, res) => {
    const url = req.url.substring(1); // Remove leading '/'
    if (!url) {
        return res.status(400).send('Bad Request: URL is missing');
    }

    req.pipe(request(url, (error, response, body) => {
        if (error) {
            console.error('Request error:', error);
            return res.status(500).send('Internal Server Error');
        }
    })).pipe(res);
});

// 404 handler for unknown routes
app.use((req, res, next) => {
    res.status(404).send('404: Not Found');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Export the app as a Vercel serverless function
module.exports = app;
