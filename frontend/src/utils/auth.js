class Auth {
  constructor({ url, headers }) {
    this._url = url;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
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
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })
      .then(this._handleResponse)
      .then((data) => {
        if (data) {
          localStorage.setItem("token", data._id);
          return data;
        }
      });;
  }

  getToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(this._handleResponse)
  }
}
const auth = new Auth({
  url: 'https://api.mesto.alex.nomoredomains.rocks',
});

export default auth;