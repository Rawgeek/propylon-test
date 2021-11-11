import {inject} from 'aurelia-framework';
import {AuthService} from './utils/auth-service';

@inject(AuthService )
export class Login {
  constructor(auth) {
    this.auth = auth;
    this.username_error = '';
    this.password_error = '';
    this.remember = false;

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
      }, ctrl.remember)
      .then(response => {
        console.log("success logged ", response);
      })
      .catch(e => {
        console.log(e)
        if (e.detail) {
          ctrl.password_error = e.detail;
        } else if (e.password) {
          ctrl.password_error = e.password;
        } else if (e.username) {
          ctrl.username_error = e.username;
        }
      });
  };

  // authenticate(name) {
  //   let ctrl = this
  //   return this.auth.authenticate(name, false, null)
  //     .then((response) => {
  //       console.log(response, ctrl.remember)
  //       setCookie('X-CSRFToken', "test")
  //     });
  //
  // }
}
