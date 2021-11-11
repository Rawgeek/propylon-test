import {AuthService} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
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
        username: this.username,
        password: this.password
      })
      .then(response => {
        console.log("success logged " + response);
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

  authenticate(name) {
    return this.auth.authenticate(name, false, null)
      .then((response) => {});

  }
}
