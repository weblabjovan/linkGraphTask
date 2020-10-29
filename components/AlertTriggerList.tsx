import React from 'react';
import { observer } from 'mobx-react';
import { Row, Col } from 'reactstrap';
import { StoreContext } from '../store';
import { IStore } from '../interfaces/data';
import { unixToTimeString } from '../lib/helpers';

const AlertTriggerList = () => {
  const store: IStore = React.useContext(StoreContext);
  const { getMyAlertTriggers, removeTriggerFromMyAlertTriggers } = store;
  const list = getMyAlertTriggers;

  return(
    <Row className="currencyTriggers__list">
      {
        list.length
        ?
        <Col sm="12" className="currencyTriggers__list__item">
          <p>My Alert Triggers</p>
          <table>
            <tbody>
              {
                list.map((item, index) => {
                  return(
                    <tr key={`currencyAlertListItemKey_${index}`}>
                      <td colSpan={3}>{item.symbol}</td>
                      <td colSpan={2}>{item.listenType}</td>
                      <td colSpan={2}>{item.listenProp}</td>
                      <td colSpan={2}>{item.limit}</td>
                      <td colSpan={4}>{unixToTimeString(item.timeStamp)}</td>
                      <td colSpan={2}><a onClick={() => removeTriggerFromMyAlertTriggers(item.id)}>Remove</a></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </Col>
        
        :
        <Col sm="12" className="currencyTriggers__list__noList">
          <h2>There are no alert triggers yet</h2>
        </Col>
      }
      
    </Row>
  )
}

export default observer(AlertTriggerList);