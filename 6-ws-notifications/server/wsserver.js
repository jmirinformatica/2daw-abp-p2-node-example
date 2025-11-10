const { json } = require('express');
const WebSocket = require('ws');

class WSServer {

    constructor(wshost, wsport) {
        this.client_map = new Map();

        const wss = new WebSocket.Server({ host: wshost, port: wsport });
        console.log("Websocket server started at host", wshost, "and port", wsport);
    
        // WebSocket event handling
        wss.on('connection', (ws) => this.on_connection(ws));
    }

    on_connection(ws) {
        // Event listener for incoming messages
        ws.on('message', (message) => {
            const json_message = JSON.parse(message);
            console.log('Received ws message from client:', json_message);
            ws.client_user = json_message.user;
            this.client_map.set(ws.client_user, ws);
        });
    
        // Event listener for client disconnection
        ws.on('close', () => {
            if(ws.client_user) {
                console.log('WS client disconnected:', ws.client_user);
                this.client_map.delete(ws.client_user);
            } else {
                console.log('Anonymous ws client disconnected');
            }
        });
    }

    send_notification_to_user(user, notification) {
        const ws = this.client_map.get(user);
        if(ws) {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify(notification));
            } else {
                console.log('Removing disconnected ws client for user:', user);
                this.client_map.delete(user);
            }
        } else {
            console.log('No active WebSocket connection for user:', user);
        }
    }

    send_notification_to_all(notification) {
        for (const [user, ws] of this.client_map.entries()) {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify(notification));
            } else {
                console.log('Removing disconnected ws client for user:', user);
                this.client_map.delete(user);
            }
        }
    }

    get_connected_users() {
        return Array.from(this.client_map.keys());
    }
}

module.exports = new WSServer('localhost', 8080);