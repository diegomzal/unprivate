class SocketService {
    constructor(io) {
        this.io = io;
        this.setupSocketHandlers();
    }

    setupSocketHandlers() {
        this.io.on('connection', (socket) => {
            socket.joinedKeys = new Set();

            socket.on('subscribe_key', (key) => this.handleSubscribeKey(socket, key));
            socket.on('unsubscribe_key', (key) => this.handleUnsubscribeKey(socket, key));
            socket.on('disconnect', () => this.handleDisconnect(socket));
        });
    }

    validateKey(key) {
        return typeof key === 'string' && key.length > 0 && key.length <= 128;
    }

    handleSubscribeKey(socket, key) {       
        if (!this.validateKey(key)) {
            socket.emit('error', { message: 'Invalid key format' });
            return;
        }

        socket.join(key);
        socket.joinedKeys.add(key);
        this.emitLiveStatus(key);
    }

    handleUnsubscribeKey(socket, key) {
        if (!this.validateKey(key)) return;

        socket.leave(key);
        socket.joinedKeys.delete(key);
        this.emitLiveStatus(key);
    }

    handleDisconnect(socket) {
        for (const key of socket.joinedKeys) {
            this.emitLiveStatus(key);
        }
    }

    emitLiveStatus(key) {
        const room = this.io.sockets.adapter.rooms.get(key);
        const count = room ? room.size : 0;
        this.io.to(key).emit('live', count > 1);
    }

    notifyNoteUpdate(key, socketId) {
        this.io.to(key).except(socketId).emit('note_updated', { key });
    }
}

module.exports = SocketService;