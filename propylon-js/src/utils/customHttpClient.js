import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import {getCookie} from './cookies'
export {json} from 'aurelia-fetch-client';

@inject()
export class CustomHttpClient extends HttpClient {
  constructor() {
    super();
    this.configure(config => {
      config
        .withBaseUrl('/')
        .withDefaults({
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
          }
        })

        .withInterceptor({
          request(request) {
            console.log(`Requesting ${request.method} ${request.url}`, request);


            request.headers.set("X-CSRFToken", getCookie('csrftoken'));
            return request;
          },
          response(response) {
            console.log(`Received ${response.status} ${response.url}`);
            if (response.status >= 200 && response.status < 400) {
              return response.json().catch(error => null);
            }

            throw response;
          }
        });
    });
  }
}
