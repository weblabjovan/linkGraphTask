import React from 'react';
import { observer } from 'mobx-react';
import { Row, Col, Alert } from 'reactstrap';
import NewAlertTrigger from './NewAlertTrigger';
import AlertTriggerList from './AlertTriggerList';
import { StoreContext } from '../store';
import { IStore } from '../interfaces/data';
import { unixToTimeString } from '../lib/helpers';

const MyCurrencyAlerts = () => {
  const store: IStore = React.useContext(StoreContext);
  const { getAlertsList, removeAlertFromAlertsList } = store;
  const alerts = getAlertsList;

  return(
    <React.Fragment>
      <Row className="currencyAlerts">
        <Col sm="12"><h1 className="currencyAlerts__title">My Alerts</h1></Col>
      </Row>
      <Row className="currencyAlerts__list">
        {
          alerts.length
          ?
          alerts.map((item, index) => {
            return(
              <Col sm="12" key={`currencyAlertItemKey_${index}`} className="currencyAlerts__list__item">
                <Alert color="danger">
                  <span className="currencyAlerts__list__item__remove" onClick={() => removeAlertFromAlertsList(item.id)}>{"\u00D7"}</span>
                  {`${item.message} Dispatched at ${unixToTimeString(item.timeStamp)}`}
                </Alert>
              </Col>
            )
          })
          :
          <Col sm="12" className="currencyAlerts__list__noList">
            <h2>There are no unseen alerts yet</h2>
          </Col>
        }
      </Row>
      <Row className="alertTriggers">
        <Col sm="7">
          <AlertTriggerList />
        </Col>

        <Col sm="5">
          <NewAlertTrigger  />
        </Col>
      </Row>
    </React.Fragment>
   
  )
}

export default observer(MyCurrencyAlerts);