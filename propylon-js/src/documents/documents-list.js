import {inject} from 'aurelia-framework';
import {CustomHttpClient} from '../utils/customHttpClient';

@inject(CustomHttpClient)
export class DocumentsList {
  url = 'api/documents/';

  documents = [];

  constructor(http) {
    this.http = http;
  }

  created() {
    let self = this
    return this.http.fetch(this.url)
     .then(documents => {
       self.documents = documents
     });
  }

  select(document) {
    this.selectedId = document.id;
    return true;
  }

  refresh() {
    return this.created()
  }

}
