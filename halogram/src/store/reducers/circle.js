const CircleReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ACTIVATE_CIRCLE':
      return {
        ...state,
        activeCircleId: action.circleId
      }

    case 'ACTIVATE_CHORD':
      return {
        ...state,
        activeChordId: action.chordId
      }

    case 'INSERT_MESSAGE':
      return {
        ...state,
        circles: state.circles.map((circle) => {
          if (circle.chords.some(chord => chord._id === action.message.chordId)) {
            return {
              ...circle,
              chords: circle.chords.map((chord) => {
                if (chord._id === action.message.chordId) {
                  const newMesssages = [...chord.messages];
                  let messageIndex = newMesssages.findIndex(message =>
                    (message._id && message._id === action.message._id) ||
                    (message.tempId && message.tempId === action.message.tempId));
                  if (messageIndex === -1) {
                    newMesssages.push(action.message);
                  } else {
                    newMesssages[messageIndex] = action.message;
                  }
                  return {
                    ...chord,
                    messages: newMesssages
                  }
                }
                return chord;
              })
            }
          }
          return circle;
        })
      }

    case 'LOAD_MESSAGES':
      return {
        ...state,
        circles: state.circles.map((circle) => {
          if (circle.chords.some(chord => chord._id === action.chordId)) {
            return {
              ...circle,
              chords: circle.chords.map((chord) => {
                if (chord._id === action.chordId) {
                  return {
                    ...chord,
                    messages: action.messages
                  }
                }
                return chord;
              })
            }
          }
          return circle;
        })
      }

    default: return state
  }
};

export default CircleReducer;