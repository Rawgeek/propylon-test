import {inject} from 'aurelia-framework';
import {CustomHttpClient} from '../utils/customHttpClient';

@inject(CustomHttpClient)
export class DocumentsList {
  url = 'api/documents/';

  constructor(http){
    this.http = http;
  }

  created() {
    return this.http.fetch(this.url)
     .then(response =>  response.json())
     .then(d => {
       this.documents = d;
     });
  }

  select(document) {
    console.log(document)
    this.selectedId = document.id;
    return true;
  }

}
