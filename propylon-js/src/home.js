import {inject} from 'aurelia-framework';
@inject( )
export class Home{

  constructor(){
    this.heading = 'Manage your documents securely';
    this.paragraph = 'Quickly store, revise and see whole history of your files. Unlimited storage, unlimited edits. Easy access from any device.';
  }

  canDeactivate() {
   /* if (this.fullName !== this.previousValue) {
      return confirm('Are you sure you want to leave?');
    }*/
  }
}
