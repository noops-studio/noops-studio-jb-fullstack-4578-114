import { Server } from "socket.io";
import config from 'config'

const port = config.get<number>('io.port')

const io = new Server({
    cors: {
        origin: '*'
    }
})

io.on('connection', socket => {

    console.log('Got a new connection:', socket.id)

    socket.onAny((eventName, payload) => {
        // Log the event name and payload
        console.log(`[LOG] Event: ${eventName}, Payload:`, payload);

        // Emit the event to all clients
        io.emit(eventName, payload);
    });

    socket.on('disconnect', () => {
        console.log(`Client ${socket.id} disconnected...`);
    });

});

io.listen(port);
console.log(`IO server started on port ${port}`);
