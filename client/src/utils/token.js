import { AUTH_ID } from 'utils/config';

export function getAuthToken() {
  return localStorage.getItem(AUTH_ID);
}

export function setAuthToken(data) {
  localStorage.setItem(AUTH_ID, data);
}

export function clearAuthToken() {
  localStorage.removeItem(AUTH_ID);
}
