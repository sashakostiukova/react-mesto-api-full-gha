import { setToken } from './token';

// export const BASE_URL = 'https://auth.nomoreparties.co';
export const BASE_URL = 'https://api.sashakostiukova.nomoredomainsmonster.ru';

function getResponseData(res) {
  if (res.ok) {
    return res.json();
  }
  
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then((res) => {
    return getResponseData(res)})
};

export function authorize(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then((res) => {
    return getResponseData(res)})
  .then((data) => {
      setToken(data.jwt);
      return data;
  })
};

export function getContent(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then((res) => {
    return getResponseData(res)})
};