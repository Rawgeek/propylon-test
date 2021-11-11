import {inject} from 'aurelia-framework';
import {CustomHttpClient} from './customHttpClient';

 @inject(CustomHttpClient)
 export class DocumentDetail {
   url = 'api/documents/';

   constructor(http){
     this.http = http;
   }

   activate(params, routeConfig) {
     this.routeConfig = routeConfig;

     return this.http.fetch(`${this.url}${params.id}`)
      .then(response =>  response.json())
      .then(document => {
        this.document = document
        this.routeConfig.navModel.setTitle(document.url);
        this.originalDocument= JSON.parse(JSON.stringify(document));
      });

   }

   get canSave() {
     return true;
   }

   save() {

   }

   canDeactivate() {

     return true;
   }
 }
