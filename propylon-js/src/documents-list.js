import {inject} from 'aurelia-framework';
import {CustomHttpClient} from './customHttpClient';

@inject(CustomHttpClient)
export class DocumentsList {
  url = 'api/documents/';

  constructor(http){
    this.http = http;
    // this.api = api;
    // this.documents = [{
    //   id: 1,
    //   url: "/documents/reviews/review.pdf",
    //   created: "2021-11-09",
    //   attachment_file: "/documents/reviews/review.pdf"
    // },{
    //   id: 2,
    //   url: "/documents/reviews/review2.pdf",
    //   created: "2021-11-06",
    //   attachment_file: "/documents/reviews/review.pdf"
    // },{
    //   id: 3,
    //   url: "/documents/reviews/review3.pdf",
    //   created: "2021-11-04",
    //   attachment_file: "/documents/reviews/review.pdf"
    // },{
    //   id: 4,
    //   url: "/documents/reviews/review4.pdf",
    //   created: "2021-11-09",
    //   attachment_file: "/documents/reviews/review.pdf"
    // },{
    //   id: 5,
    //   url: "/documents/reviews/review5.pdf",
    //   created: "2021-11-09",
    //   attachment_file: "/documents/reviews/review.pdf"
    // },{
    //   id: 6,
    //   url: "/documents/reviews/review6.pdf",
    //   created: "2021-11-09",
    //   attachment_file: "/documents/reviews/review.pdf"
    // }];
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
