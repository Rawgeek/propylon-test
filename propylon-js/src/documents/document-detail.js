import {inject} from 'aurelia-framework';
import {CustomHttpClient} from '../utils/customHttpClient';
import {DocumentsList} from './documents-list';

@inject(CustomHttpClient, DocumentsList)
export class DocumentDetail {
  url = 'api/documents/';

  constructor(http, documents) {
    this.http = http;
    this.documents = documents;
  }

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;

    return this.http.fetch(`${this.url}${params.id}`)
      .then(document => {
        this.document = document
        this.routeConfig.navModel.setTitle(document.download_url);
      })
      .catch(err => {
        window.location.href = `/#/documents/`
      });

  }

  get canSave() {
    return this.document.download_url && this.document.attachment_file && !this.http.isRequesting;
  }

  delete() {
    this.http.fetch(`api/documents/${this.document.id}`, {
        method: 'DELETE',
      })
      .then(document => {
        this.documents.refresh().then(res => {
          window.location.href = `/#/documents/`
        })
      });
  }

  save() {
    var form = new FormData()
    form.append('id', this.document.id)
    form.append('attachment_file', this.document.attachment_file[0])
    form.append('download_url', this.document.download_url)

    this.http.fetch(`api/documents/${this.document.id}`, {
        method: 'PUT',
        body: form
      })
      .then(document => {
        this.http.fetch(`api/documents/${this.document.id}`, {
          method: 'GET',
        }).then(document => {
          this.document = document
        })

      });
  }

}
