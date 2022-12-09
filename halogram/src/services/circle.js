import { CircleActions } from '../store/actions';

export const activateChord = (chord) => {
  CircleActions.activateChord(chord._id);
}

export const activateCircle = (circle) => {
  CircleActions.activateCircle(circle._id);
  activateChord(circle.chords[0]);
}

export const insertMessage = (message) => {
  CircleActions.insertMessage(message);
}
