import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {getCookie, deleteCookie} from './cookies';

@inject(HttpClient)
export class AuthService {
  _cookie_name = 'csrftoken';

  constructor(http) {
    this.expire
    this.http = http
  }

  isAuthenticated() {
    return getCookie(this._cookie_name)
  }

  login(params, remember) {
    self = this;
    return this.http.fetch('api/login/', {
      method: 'post',
      body: json(params)
    }).then(response => {
      window.location.href = "/#/";
      return response
    })
  }

  logout(redirect) {
    self = this;
    return this.http.fetch('api/logout/', {
      method: 'get'
    }).then(response => {
      deleteCookie(this._cookie_name)
      if (redirect) {
        window.location.href = redirect;
      }
      return response
    })
  }

  getLoginRoute() {
    return '/#/login'
  }
}
