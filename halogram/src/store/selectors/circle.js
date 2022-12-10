import { createSelector } from 'reselect';

export const selectActiveCircleId = state => state.circle.activeCircleId;
export const selectActiveChordId = state => state.circle.activeChordId;
export const selectAllCircles = state => state.circle.circles;


export const selectActiveCircle = createSelector(
  selectActiveCircleId,
  selectAllCircles,
  (activeCircleId, allCircles) => allCircles?.find(circle => circle._id === activeCircleId)
);

export const selectChordsOfActiveCircle = createSelector(
  selectActiveCircle,
  activeCircle => activeCircle?.chords
);

export const selectActiveChord = createSelector(
  selectChordsOfActiveCircle,
  selectActiveChordId,
  (allChordsOfActiveCircle, activeChordId) => allChordsOfActiveCircle?.find(chord => chord._id === activeChordId)
);

export const selectMessagesOfActiveChord = createSelector(
  selectActiveChord,
  activeChord => activeChord?.messages
);
