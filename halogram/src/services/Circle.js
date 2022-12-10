import { CircleActions } from '../store/actions';
import ChatEngine from './ChatEngine';

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