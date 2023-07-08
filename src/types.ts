export interface IDiontOptions {
  broadcast: boolean;
  host: string;
  port: number;
  ttl: number;
}

export interface IService {
  name: string;
  host: string;
  port: number | string;

  [key: string]: unknown;
}

export type IOptionalHostService = Omit<IService, 'host'> & {
  host?: IService['host'];
};

export interface IServiceInfo {
  isOurService: boolean;
  service: IService;
}

export type IEvents = 'serviceRenounced' | 'serviceAnnounced';

export type IEventCallback = (serviceInfo: IServiceInfo) => void;

export type IMessage =
  | {
      eventType: 'announce' | 'renounce';
      fromDiontInstance: string;
      serviceInfos: IServiceInfo[];
    }
  | {
      eventType: 'query';
      fromDiontInstance: string;
    };

export interface IExports extends AsyncDisposable {
  announceService: (service: IOptionalHostService) => `${string}:${string}:${string}` | null;
  renounceService: (service: IService | IOptionalHostService | `${string}:${string}:${string}`) => void;
  repeatAnnouncements: () => void;
  queryForServices: () => void;
  on: (eventName: IEvents, callback: IEventCallback) => string;
  off: (eventName: IEvents, callbackId: string) => boolean;
  getServiceInfos: () => IServiceInfo[];
  dispose: () => Promise<void>;
}
