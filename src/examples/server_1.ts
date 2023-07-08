import Diont from '../diont';
import { IService } from '../types';

const diont = Diont();

// ======
// Announce our own service
// ======
const service: IService = {
  name: 'TestServer 1',
  host: '127.0.0.1', // defaults to the local IP
  port: '1231'
  // any additional information is allowed
};

diont.announce(service);

// Renounce after 5 seconds
setTimeout(function () {
  diont.renounce(service);
}, 5000);
