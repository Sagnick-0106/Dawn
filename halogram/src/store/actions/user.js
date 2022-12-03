import store from '../index';

const { dispatch } = store;

export const login = (userMetadata) => {
  dispatch({ type: 'LOGIN', userMetadata });
}

export const logout = () => {
  dispatch({ type: 'LOGOUT' });
}
