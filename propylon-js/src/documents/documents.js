export class Home{
  constructor(){
    this.heading = 'My documents';
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
