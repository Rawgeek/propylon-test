import 'bootstrap/dist/css/bootstrap.css';
// import 'font-awesome/css/font-awesome.css';

import environment from '../config/environment.json';
import {PLATFORM} from 'aurelia-pal';
import config from 'authConfig';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('aurelia-auth'), (baseConfig) =>  {
      baseConfig.configure(config);
    })
    .feature(PLATFORM.moduleName('resources/index'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
