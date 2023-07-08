import NetworkDiscovery from './diont';
import { IServiceInfo } from './types';

(async () => {
  describe('testing listener with servers', () => {
    const serviceListener = NetworkDiscovery({
      broadcast: true
    });
    test('receive multicast from our service', async () => {
      const serviceType = 'nas-ui';
      const serviceName = 'NAS01 UI';
      const serviceAnnouncer = NetworkDiscovery({
        broadcast: false,
        ttl: 1
      });
      try {
        await new Promise<void>((resolve) => {
          let listenerMessageReceivedHandlerId = '';
          const handleListenerMessageReceived = async (serviceInfo: IServiceInfo) => {
            try {
              serviceListener.off('serviceAnnounced', listenerMessageReceivedHandlerId);
              const serviceAnnouncerService = serviceAnnouncer.getServiceInfos().find((s) => s.service.name.includes(serviceName));
              expect(serviceAnnouncerService).toBeDefined();
              expect(serviceAnnouncerService).not.toBeNull();
              expect(serviceAnnouncerService).toHaveProperty('isOurService', true);
              expect(serviceAnnouncerService?.service).toHaveProperty('type', serviceType);
              expect(serviceAnnouncerService?.service).toHaveProperty('name', serviceName);
              expect(serviceInfo).toHaveProperty('isOurService', false);
              expect(serviceInfo.service).toHaveProperty('type', serviceType);
              expect(serviceInfo.service).toHaveProperty('name', serviceName);
            } finally {
              await serviceAnnouncer.dispose();
              resolve();
            }
          };
          listenerMessageReceivedHandlerId = serviceListener.on('serviceAnnounced', handleListenerMessageReceived);
          serviceAnnouncer.announce({
            port: 5000,
            host: '10.0.0.10',
            type: serviceType,
            name: serviceName
          });
        });
      } catch (e) {
        await serviceAnnouncer.dispose();
        console.error(e);
      } finally {
        await serviceListener.dispose();
      }
    });
  });
})();
