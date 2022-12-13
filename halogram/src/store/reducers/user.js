const UserReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        userMetadata: action.userMetadata
      }

    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        userMetadata: null,
      }
    
    default: return state
  }
};

export default UserReducer;
