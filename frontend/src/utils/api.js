class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  _getResponse(response) {
    if (response.ok) {
      return response.json();
    }
    
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  _request(endpoint, options) {
    console.log(options); //////////////////

    return fetch(`${this._url + endpoint}`, options)
      .then(this._getResponse)
  }

  getAllCards(jwt) {
    return this._request('/cards', {
      // headers: this._headers,
      headers: { "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`, }
    });
  }

  getUserInfo(jwt) {
    return this._request('/users/me', {
      headers: { "Content-Type": "application/json",
               authorization: `Bearer ${jwt}`, }
    });
  }

  editUserInfo({name, about}, jwt) {
    return this._request('/users/me', {
      method: 'PATCH',
      // headers: this._headers,
      headers: { "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`, },

      body: JSON.stringify({
        name: name,
        about: about
      })
    });
  }

  addCard({name, link}, jwt) {
    return this._request('/cards', {
      method: 'POST',
      // headers: this._headers,
      headers: { "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`, },
      body: JSON.stringify({
        name: name,
        link: link
      })
    });
  }

  deleteCard(cardId, jwt) {
    return this._request(`/cards/${cardId}`, {
      method: 'DELETE',
      // headers: this._headers,
      headers: { "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`, },
    });
  }

  like(cardId, jwt) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'PUT',
      // headers: this._headers,
      headers: { "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`, },
    });
  }

  deleteLike(cardId, jwt) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'DELETE',
      // headers: this._headers,
      headers: { "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`, },
    });
  }

  updateAvatar(link, jwt) {
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      // headers: this._headers,
      headers: { "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`, },
      body: JSON.stringify({
        avatar: link
      })
    });
  }
  
}

// const apiConfig = {
//   url: 'https://mesto.nomoreparties.co/v1/cohort-74',
//   headers: {
//     "Content-Type": "application/json",
//     authorization: '1d3a749f-f7d8-44c4-ad86-87f3a5b73fd2',
//   }
// };
const apiConfig = {
  url: 'https://api.sashakostiukova.nomoredomainsmonster.ru',
  headers: {
    "Content-Type": "application/json"
  }
};

const api = new Api(apiConfig);
export default api;