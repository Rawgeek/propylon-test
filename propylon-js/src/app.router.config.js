import {AuthorizeStep} from './utils/authorize-step';
import {inject} from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';
import {Router} from 'aurelia-router';

@inject(Router)
export default class{

	constructor(router){
		this.router = router;
	}
	configure(){
		var appRouterConfig = function(config){
			config.title = 'Propylon';
			config.addPipelineStep('authorize', AuthorizeStep); // Add a route filter to the authorize extensibility point.

			config.map([
				{ route: ['','home'],  moduleId: PLATFORM.moduleName('home'),      name: 'home', nav: true, title:'Home' },
        { route: 'documents',  moduleId: PLATFORM.moduleName('documents/documents'),      name: 'documents', nav: true, title:'My documents', auth: true },
				{ route: 'login',        moduleId: PLATFORM.moduleName('login'),       nav: false, title:'Login' },
				{ route: 'logout',        moduleId: PLATFORM.moduleName('logout'),       nav: false, title:'Logout' },

				]);
			};

		this.router.configure(appRouterConfig);
	}

}
