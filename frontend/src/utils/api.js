class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(response, method) {
    return response.ok
      ? response.json()
      : Promise.reject(`${method}: ${response.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers, credentials: "include"}).then(
      (res) => {
        return this._checkResponse(res, "getUserInfo");
      }
    );
  }

  setAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      credentials: "include",
      method: "PATCH",
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => {
      return this._checkResponse(res, "setAvatar");
    });
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: "include",
      method: "PATCH",
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => {
      return this._checkResponse(res, "setUserInfo");
    })
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers, credentials: "include"}).then(
      (res) => {
        return this._checkResponse(res, "getInitialCards");
      }
    );
  }

  changeLikeCardStatus(id, status) {
    if (status) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "DELETE",
        credentials: "include",
        headers: this._headers,
      }).then((res) => {
        return this._checkResponse(res, "removeLike");
      });
    } else {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        credentials: "include",
        headers: this._headers,
        method: "PUT",
      }).then((res) => {
        return this._checkResponse(res, "addLike");
      });
    }
  }

  addCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    }).then((res) => {
      return this._checkResponse(res, "addCard");
    });
  }

  removeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res, "removeCard");
    });
  }
}

const api = new Api({
  baseUrl: 'https://api.mesto.alex.nomoredomains.rocks',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;