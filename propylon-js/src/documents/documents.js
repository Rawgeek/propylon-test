import {inject} from 'aurelia-framework';

@inject( )
export class Home{

  constructor(){
    this.heading = 'My documents';
  }

  canDeactivate() {
   /* if (this.fullName !== this.previousValue) {
      return confirm('Are you sure you want to leave?');
    }*/
  }

  configureRouter(config, router){
    config.map([
        { route: '',  moduleId: PLATFORM.moduleName('documents/document-no-selection')},
        { route: ':id',  moduleId: PLATFORM.moduleName('documents/document-detail'), name: 'documentDetails'},
        { route: 'new',  moduleId: PLATFORM.moduleName('documents/document-new'), name: 'documentNew'},
  		]);

    this.router = router;
  }
}
