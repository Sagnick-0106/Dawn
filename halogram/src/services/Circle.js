import { CircleActions } from '../store/actions';
import ChatEngine from './ChatEngine';
import API from './Api';

const PARROT_URL = 'http://localhost:8100/api';
const ParrotAPI = new API(PARROT_URL);

export const activateChord = (chord) => {
  ChatEngine.getInstance().joinChord(chord._id);
  CircleActions.activateChord(chord._id);
}

export const activateCircle = (circle) => {
  CircleActions.activateCircle(circle._id);
  activateChord(circle.chords[0]);
}

export const insertMessage = (message) => {
  CircleActions.insertMessage(message);
}

export const sendMessage = (message) => {
  ChatEngine.getInstance().sendMessage(message);
  insertMessage(message);
}

export const loadMessages = async(chordId) => {
    try {
      const messages = await ParrotAPI.makeAuthenticatedRequest({
        method: 'GET',
        url: `/messages`,
        params: {
          chordId
        }
      });
      CircleActions.loadMessages(chordId, messages);
    } catch (error) {
        console.error(error);
    }
}
