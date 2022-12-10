import store from '../index';

const { dispatch } = store;

export const activateCircle = (circleId) => {
  dispatch({ type: 'ACTIVATE_CIRCLE', circleId });
}

export const activateChord = (chordId) => {
  dispatch({ type: 'ACTIVATE_CHORD', chordId });
}

export const insertMessage = (message) => {
  dispatch({ type: 'INSERT_MESSAGE', message });
}
