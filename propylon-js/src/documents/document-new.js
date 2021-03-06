import {inject} from 'aurelia-framework';
import {CustomHttpClient} from '../utils/customHttpClient';
import {DocumentsList} from './documents-list';

@inject(CustomHttpClient, DocumentsList)
export class DocumentNew {
  url = 'api/documents/';

  constructor(http, documents) {
    this.http = http;
    this.document = {}
    this.documents = documents
    this.errors = [];
  }

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;

  }

  get canSave() {
    return this.document.download_url && this.document.attachment_file && !this.http.isRequesting;
  }

  save() {
    let ctrl = this;
    ctrl.errors = []


    var form = new FormData()
    form.append('attachment_file', this.document.attachment_file[0])
    form.append('download_url', this.document.download_url)

    this.http.fetch(`api/documents/`, {
        method: 'POST',
        body: form
      })
      .then(document => {
        this.documents.refresh().then(res => {
          window.location.href = `/#/documents/${document.id}`
        })
      })
      .catch(err => {
        err.json().then(function(e) {
          ctrl.errors = e
        });
      });
  }

  canDeactivate() {

    return true;
  }
}
