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
    return fetch(`${this._url + endpoint}`, options)
      .then(this._getResponse)
  }

  getAllCards(jwt) {
    return this._request('/cards', {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      }
    });
  }

  getUserInfo(jwt) {
    return this._request('/users/me', {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      }
    });
  }

  editUserInfo({name, about}, jwt) {
    return this._request('/users/me', {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    });
  }

  addCard({name, link}, jwt) {
    return this._request('/cards', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    });
  }

  deleteCard(cardId, jwt) {
    return this._request(`/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
    });
  }

  like(cardId, jwt) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
    });
  }

  deleteLike(cardId, jwt) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
    });
  }

  updateAvatar(link, jwt) {
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        avatar: link
      })
    });
  }
  
}

const apiConfig = {
  url: 'https://api.sashakostiukova.nomoredomainsmonster.ru',
  headers: {
    "Content-Type": "application/json"
  }
};

const api = new Api(apiConfig);
export default api;