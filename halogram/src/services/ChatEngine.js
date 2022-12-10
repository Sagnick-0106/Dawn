import io from 'socket.io-client';
import { insertMessage } from './Circle';
import { getToken } from './User';

export default class ChatEngine {
  static instance = new ChatEngine();
  joinedChords = [];

  constructor() { }

  static getInstance() {
    return this.instance;
  }

  static init() {
    const token = getToken();
    this.instance.socket = io(`http://${window.location.hostname}:8100`, { auth: { token } });
    this.instance.socket.on('message', insertMessage);
  }

  joinChord(chordId) {
    if (chordId && !this.joinedChords.includes(chordId)) {
      this.socket.emit('joinChord', { chordId }, error => console.error(error));
      this.joinedChords.push(chordId);
    }
  }

  sendMessage(newMessage) {
    this.socket.emit('message', newMessage);
  }
}
