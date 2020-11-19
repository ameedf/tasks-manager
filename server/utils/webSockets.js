const socketio = require('socket.io');

const ws = {
	io: null,
	sockets: [],
}
module.exports.initialize = (server) => {
	ws.io = socketio(server);
	ws.io.on('connection', (socket) => {
		socket.on("user/connect", userId => {
			console.log(`user ${userId} is connected to socket ${socket.id}`)
			socket.join(userId);
			ws.sockets.push({userId, socketId: socket.id});
		});
	});
}
module.exports.io = () => ws.io;
