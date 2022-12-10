import API from './Api';
import { UserActions } from '../store/actions';
import ChatEngine from './ChatEngine';

const HALOGRAM_TOKEN = 'HALOGRAM_TOKEN';

const BACKBONE_URL = 'http://localhost:8000/api';
const BackboneAPI = new API(BACKBONE_URL);

export const authenticate = async () => {
  try {
    const userMetadata = await BackboneAPI.makeAuthenticatedRequest({
      method: 'GET',
      url: `/users/me`,
    });
    UserActions.login(userMetadata);
    ChatEngine.init(userMetadata.token);
    return userMetadata;
  } catch (error) {
      console.error(error);
  }
};

export const login = async (email, password) => {
  try {
    const userMetadata = await BackboneAPI.makeRequest({
      method: 'POST',
      url: `/users/login`,
      data: {
        email,
        password
      }
    });
    setToken(userMetadata.token);
    ChatEngine.init(userMetadata.token);
    UserActions.login(userMetadata);
    return userMetadata; 
  } catch (error) {
    console.error(error);
  }
}

export const register = async ({ name, email, password }) => {
  try {
    const userMetadata = await BackboneAPI.makeRequest({
      method: 'POST',
      url: `/users/register`,
      data: {
        name,
        email,
        password
      }
    });
    setToken(userMetadata.token);
    UserActions.login(userMetadata);
    return userMetadata; 
  } catch (error) {
    console.error(error);
  }
}

export const logout = () => {
  localStorage.removeItem(HALOGRAM_TOKEN);
  UserActions.logout();
}

export const setToken = (token) => {
  localStorage.setItem(HALOGRAM_TOKEN, token);
}

export const getToken = () => {
  return localStorage.getItem(HALOGRAM_TOKEN);
}
