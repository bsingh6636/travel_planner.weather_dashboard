import chalk from 'chalk';
import express from 'express';
import request from 'request';

const app = express();
const PORT = process.env.PORT || 1234;

// Middleware for CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Proxy route
app.use('/', (req, res) => {
    const url = req.url.substring(1); // Remove leading slash
    if (!url.startsWith('http')) {
        return res.status(400).send('Invalid URL');
    }
    req.pipe(request(url)).pipe(res);
});

// Start server
app.listen(PORT, () => {
    console.log(chalk.green(`Proxy server running on port ${PORT}`));
});
