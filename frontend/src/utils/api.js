class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  async getUserInfo() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
      credentials: 'include',
    })
    return this._checkResponse(res);
  }

  async setAvatar(avatarURL) {
    const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar: avatarURL,
      }),
    })
    return this._checkResponse(res);
  }

  async setUserInfo(name, about) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
    return this._checkResponse(res);
  }

  async getInitialCards() {
    const res = await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      credentials: 'include',
    });
    return this._checkResponse(res);
  }

  async changeLikeCardStatus(id, status) {
    if (status) {
      const res = await fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._headers,
        credentials: 'include',
      })
      return this._checkResponse(res);
    } else {
      const res = await fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "PUT",
        headers: this._headers,
        credentials: 'include',
      })
      return this._checkResponse(res);
    }
  }

  async addCard(card) {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    })
    return this._checkResponse(res);
  }

  async removeCard(id) {
    const res = await fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: 'include',
    })
    return this._checkResponse(res);
  }
}

const api = new Api({
  baseUrl: 'https://api.mesto.alex.nomoredomains.rocks',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;