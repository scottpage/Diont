import Diont from '../diont';
import { IOptionalHostService } from '../types';

const diont = Diont({
  broadcast: true
});

// ======
// Announce our own service
// ======
const service: IOptionalHostService = {
  name: 'TestServer 3',
  // host: "127.0.0.1", // defaults to the local IP
  port: '1233',
  announcedViaBroadcast: 'Oh yes!'
  // any additional information is allowed
};

const id = diont.announce(service);

// Renounce after 5 seconds
setTimeout(function () {
  if (id) {
    diont.renounce(id);
  }
}, 5000);
