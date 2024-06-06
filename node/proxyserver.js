// proxyServer.js
const express = require('express');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 3001;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use('/', (req, res) => {
    const url = req.url.substring(1);
    req.pipe(request(url)).pipe(res);
});

app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});
