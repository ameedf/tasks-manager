import {createContext} from 'react';
import {io} from 'socket.io-client';

export const WebSocketContext = createContext(null);

class WebSocketsProvider {
	constructor() {
		this.socket = io();
	}
}

export default WebSocketsProvider;
