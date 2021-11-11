import {inject} from 'aurelia-framework';
import {AuthService} from './utils/auth-service';

@inject(AuthService )
export class Login {
  constructor(auth) {
    this.auth = auth;
    this.username_error = '';
    this.password_error = '';

  };

  username = '';
  password = '';

  login() {
    let ctrl = this;
    ctrl.username_error = null;
    ctrl.password_error = null;

    return this.auth.login({
        username: ctrl.username,
        password: ctrl.password
      })
      .then(response => {
        window.location.href = "/#/"
      })
      .catch(err => {
        err.json().then(function(e) {
          if (e.detail) {
            ctrl.password_error = e.detail;
          } else if (e.password) {
            ctrl.password_error = e.password;
          } else if (e.username) {
            ctrl.username_error = e.username;
          }
        });
      });
  };

  activate() {
    if (this.auth.isAuthenticated()) {
      window.location.href = "/#/"
    }
  }
}
