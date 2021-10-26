class Api {
  constructor(apiUrl) {
    this._apiUrl = apiUrl;
  }

  _promiseHandler(promise) {
    return promise
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
  }

  register(email, password) {
    return this._promiseHandler(fetch(`${this._apiUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }));
  }

  authorize = (email, password) => {
    return this._promiseHandler(fetch(`${this._apiUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }));
  }

  getUserInfo() {
    return this._promiseHandler(fetch(`${this._apiUrl}/users/me`, {
      method: 'GET',
      credentials: 'include'
    }));
  }

  setUserInfo(name, about) {
    return this._promiseHandler(fetch(`${this._apiUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, about })
    }));
  }

  setUserAvatar(avatar) {
    return this._promiseHandler(fetch(`${this._apiUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ avatar })
    }));
  }

  getInitialCards() {
    return this._promiseHandler(fetch(`${this._apiUrl}/cards`, {
      method: 'GET',
      credentials: 'include'
    }));
  }

  addCard(name, link) {
    return this._promiseHandler(fetch(`${this._apiUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, link })
    }));
  }

  deleteCard(cardId) {
    return this._promiseHandler(fetch(`${this._apiUrl}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
    }));
  }

  changeCardLikeStatus(cardId, isLiked) {
    return isLiked
      ? this._promiseHandler(fetch(`${this._apiUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        credentials: 'include',
      }))
      : this._promiseHandler(fetch(`${this._apiUrl}/cards/${cardId}/likes`, {
          method: 'PUT',
          credentials: 'include',
        }));
  }
}

export default new Api('http://localhost:3000');
