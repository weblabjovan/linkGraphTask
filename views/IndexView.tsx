import React from 'react';
import { observer } from 'mobx-react';
import { StoreContext } from '../store';
import { Container } from 'reactstrap';
import TabComponent from '../components/globals/TabsComponent';
import CurrencyList from '../components/CurrencyList';
import MyCurrencyAlerts from '../components/MyCurrencyAlerts';
import { ITabsComponent } from '../interfaces/components';
import { IStore } from '../interfaces/data';


const IndexView = (props: {list: Array<any>}) => {
  const tablist: Array<ITabsComponent> = [{id:"CurrencyList", name:"Markets Info"},{id:"MyCurrencyAlerts", name:"My Alerts"} ];
  const store: IStore = React.useContext(StoreContext);
  const { activeTab, changeTab, setCurrencyList, setInitialMyAlertTriggers, getNewcurrencyList, setInitialMyCurrencyAlerts } = store;
  const { list } = props;

  React.useEffect(() => {
    setInterval( () => getNewcurrencyList(), 5*60*1000 );
    const triggers = localStorage.getItem('myAlertTriggers');
    if(triggers){
      setInitialMyAlertTriggers(JSON.parse(triggers));
    }
    const alerts = localStorage.getItem('myCurrencyAlerts');
    if(alerts){
      setInitialMyCurrencyAlerts(JSON.parse(alerts));
    }
    setCurrencyList(list);
  }, []);

  return(
    <Container>
      <TabComponent tabs={ tablist } activeTab={ activeTab } changeTab={ changeTab } />
      {
        activeTab === "CurrencyList"
        ?
        <CurrencyList />
        :
        activeTab === "MyCurrencyAlerts"
        ?
        <MyCurrencyAlerts />
        :
        <div>Null</div>
      }
    </Container>
   
  )
}

export default observer(IndexView);