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
     .then(d => {
       this.documents = d;
     });
  }

  select(document) {
    this.selectedId = document.id;
    return true;
  }

}
