class OnlineUsers {

    constructor() {
        this.users_map = new Map();
    }

    add_user(name, sendEvent) {
        console.log(`${name} => online :)`);
        this.users_map.set(name, sendEvent);

        //enviar notificació a tots els clients
        this.#send_event_to_all({
            type: 'login',
            name: name
        });
    }

    remove_user(name) {
        console.log(`${name} => offline ;(`);
        
        //enviar notificació a tots els clients
        this.#send_event_to_all({
            type: 'logout',
            name: name
        });

        this.users_map.delete(name);
    }

    is_user_online(name) {
        return this.users_map.has(name);
    }

    get_online_users() {
        return Array.from(this.users_map.keys());
    }

    send_event_to_user(name, data) {
        const sendEvent = this.users_map.get(name);
        if(sendEvent) {
            console.log(`Sending event to ${name}:`, data);
            sendEvent(data);
        } else {
            console.log('No active connection for user:', name);
        }
    }

    //privat
    #send_event_to_all(data) {
        for (const [, sendEvent] of this.users_map.entries()) {
            sendEvent(data);
        }
    }
}

module.exports = new OnlineUsers();