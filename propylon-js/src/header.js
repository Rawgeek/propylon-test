import {bindable } from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {AuthService} from './utils/auth-service';

@inject(AuthService)
export class Header {
    _isAuthenticated = false;

    @bindable router = null;
    subscription = {};
    constructor(auth) {
        this.auth = auth;
    }

    get isAuthenticated() {
        return this.auth.isAuthenticated();
    }

}
