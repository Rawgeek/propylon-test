import {AuthService} from './utils/auth-service';
import {inject} from 'aurelia-framework';


@inject(AuthService )
export class Logout{
	constructor(auth){
		this.auth = auth;
	};

	 activate(){
		this.auth.logout("/#/login")
	}
}
