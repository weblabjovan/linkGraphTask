export interface ICurrency{ 
  volume: number;
  latest_trade: number;
  weighted_price: any;
  bid: number; 
  high: any;
  currency: string;
  low: any; 
  ask: number; 
  close: number; 
  avg: any;
  symbol: string;
  duration: number; 
  currency_volume: number;
}

export interface IAlert{
  id: number;
  trigger: number;
  message: string;
  timeStamp: number;
}

export interface ITrigger{
  id: number;
  symbol: string;
  listenProp: string;
  listenType: string;
  limit: number;
  timeStamp: number;
}

export interface IStore{
  activeTab: string;
  changeTab(name: string): void;
  currencySearchField: string;
  changeCurrencySearchField(val:string): void;
  clearCurrencySearchField(): void;
  currencyListPage: number;
  currencyListPageSize: number,
  currencySortProp: string;
  currencySortDirection: string;
  currencyList: Array<ICurrency>;
  setCurrencyList(list: Array<ICurrency>): void;
  sortCurrencyList(props: string): void;
  movecurrencyListPage(instruction: string): void;
  getCurrentPageList?: any;
  getCurrencyListPageMax?: any;
  myAlertTriggers: Array<ITrigger>;
  newTriggerFormSymbol: string;
  newTriggerFormListenProp: string;
  newTriggerFormListenType: string;
  newTriggerFormLimit: number;
  changeTriggerFormValue(prop: string, value: string | number): void;
  addMyAlertTrigger(): void;
  setInitialMyAlertTriggers(triggers: Array<ITrigger>): void;
  getMyAlertTriggers?: any;
  removeTriggerFromMyAlertTriggers(id: number): void;
  getNewcurrencyList(): void;
  alertsList: Array<IAlert>;
  getAlertsList?: any;
  setInitialMyCurrencyAlerts(alerts: Array<IAlert>): void;
  removeAlertFromAlertsList(id: number): void;
}

