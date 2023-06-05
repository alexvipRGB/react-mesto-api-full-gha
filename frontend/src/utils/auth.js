class Auth {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  registerUser(email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(this._handleResponse)
  }

  loginUser(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      credentials: "include",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(this._handleResponse)
  }

  getToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: "include",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(this._handleResponse)
  }
}



const auth = new Auth({
  url: 'https://api.mesto.alex.nomoredomains.rocks',
});

export default auth;