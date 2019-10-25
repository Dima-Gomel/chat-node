const express = require('express');
const WebSocket = require('ws');

const port = process.env.PORT || 3000; 

const app = express();
const server = app.listen(port, () => {
    console.log('Server stated on port: ', port);
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });      
});
