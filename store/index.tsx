import React from 'react';
import { useLocalObservable } from 'mobx-react';
import { action } from 'mobx';
import { IStore, ICurrency, ITrigger, IAlert } from '../interfaces/data';
import { bubbleSort, getListPart, getListWithKeyword, binarySearch, getNewList, setNewAlertsList } from '../lib/helpers';

export const StoreContext = React.createContext<any>([]);

export const StoreProvider: any = ({children}) => {
  const store: IStore = useLocalObservable(() => ({
    activeTab: 'CurrencyList',
    changeTab: (name: string) => {
      store.activeTab = name;
    },
    currencySearchField: "",
    changeCurrencySearchField: (val:string): void => {
      store.currencySearchField = val;
      store.currencyListPage = 1;
      store.currencySortProp = "";
      store.currencySortDirection = "DESC";
    },
    clearCurrencySearchField: (): void => {
      store.currencySearchField = "";
      store.currencyListPage = 1;
      store.currencySortProp = "";
      store.currencySortDirection = "DESC";
    },
    currencyListPage: 1,
    currencyListPageSize: 20,
    currencySortProp: "",
    currencySortDirection: "DESC",
    currencyList: [],
    setCurrencyList: (list: Array<ICurrency>): void => {
      store.currencyList = [...list];
    },
    sortCurrencyList: (prop: string): void => {
      const sortDirection = store.currencySortProp === prop ? store.currencySortDirection === "ASC" ? "DESC" : "ASC" : "DESC";
      const newList = bubbleSort(store.currencyList, prop, sortDirection);
      store.currencySortProp = prop;
      store.currencySortDirection = sortDirection;
      store.currencyList = newList;
    },
    movecurrencyListPage: (instruction: string): void => {
      if (instruction === 'next') {
        store.currencyListPage = store.currencyListPage + 1;
      }
      if (instruction === 'prev') {
        store.currencyListPage = store.currencyListPage - 1;
      }
    },
    get getCurrentPageList(): Array<ICurrency>{
      const list = getListWithKeyword(store.currencyList, store.currencySearchField);
      return getListPart(list, store.currencyListPage, store.currencyListPageSize);
    },
    get getCurrencyListPageMax(): number{
      const list = getListWithKeyword(store.currencyList, store.currencySearchField);
      return Math.ceil(list.length / store.currencyListPageSize);
    },
    myAlertTriggers: [],
    newTriggerFormSymbol: "",
    newTriggerFormListenProp: "",
    newTriggerFormListenType: "",
    newTriggerFormLimit: 0,
    changeTriggerFormValue: (prop: string, value: string | number): void => {
      store[prop] = value;
    },
    addMyAlertTrigger: (): void => {
      const alert = {
        id: !store.myAlertTriggers.length ? 1 : (store.myAlertTriggers[store.myAlertTriggers.length - 1].id + 1),
        symbol: store.newTriggerFormSymbol,
        listenProp: store.newTriggerFormListenProp,
        listenType: store.newTriggerFormListenType,
        limit: store.newTriggerFormLimit,
        timeStamp: Math.round((new Date()).getTime() / 1000),
      }
      
      store.myAlertTriggers.push(alert);
      store.newTriggerFormSymbol = "";
      store.newTriggerFormListenProp = "";
      store.newTriggerFormListenType = "";
      store.newTriggerFormLimit = 0;
      localStorage.setItem("myAlertTriggers", JSON.stringify(store.myAlertTriggers));
    },
    setInitialMyAlertTriggers: (triggers: Array<ITrigger>): void => {
      store.myAlertTriggers = triggers;
    },
    removeTriggerFromMyAlertTriggers: (id: number): void => {
      const index = binarySearch(store.myAlertTriggers, id);
      const triggers = [...store.myAlertTriggers];
      triggers.splice(index, 1);
      store.myAlertTriggers = triggers;
      localStorage.setItem("myAlertTriggers", JSON.stringify(triggers));
    },
    get getMyAlertTriggers(): Array<ITrigger>{
      return store.myAlertTriggers;
    },
    getNewcurrencyList: () => {
      getNewList().then( 
        action( "changeCurrencyList", list => {
          let newList = [];
          if(store.currencySortProp){
            newList = bubbleSort(list, store.currencySortProp, store.currencySortDirection);
          }else{
            newList = list;
          }

          store.currencyList = newList;
          store.alertsList = setNewAlertsList(newList, store.alertsList, store.myAlertTriggers);
          localStorage.setItem("myCurrencyAlerts", JSON.stringify(store.alertsList));
        })
      );
    },
    alertsList: [],
    get getAlertsList(): Array<IAlert>{
      return store.alertsList;
    },
    setInitialMyCurrencyAlerts: (alerts: Array<IAlert>) => {
      store.alertsList = alerts;
    },
    removeAlertFromAlertsList: (id: number) => {
      const index = binarySearch(store.alertsList, id);
      const alerts = [...store.alertsList];
      alerts.splice(index, 1);
      store.alertsList = alerts;
      localStorage.setItem("myCurrencyAlerts", JSON.stringify(alerts));
    }

  }))
  return(
  <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  )
};

export default StoreProvider;