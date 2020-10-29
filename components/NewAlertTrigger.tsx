import React from 'react';
import { observer } from 'mobx-react';
import { Row, Col } from 'reactstrap';
import { StoreContext } from '../store';
import { IStore } from '../interfaces/data';

const NewAlertTrigger = () => {
  const store: IStore = React.useContext(StoreContext);
  const { addMyAlertTrigger, changeTriggerFormValue, newTriggerFormSymbol, newTriggerFormListenProp, newTriggerFormListenType, newTriggerFormLimit } = store;
  const [formErrors, setFormErrors] = React.useState({ symbol: false, type: false, prop: false, limit: false });

  const handleCreate = () => {
    let flag = true;
    const errorCopy = {...formErrors};

    !newTriggerFormSymbol ? errorCopy.symbol = true : errorCopy.symbol = false;
    !newTriggerFormListenProp ? errorCopy.prop = true : errorCopy.prop = false;
    !newTriggerFormListenType ? errorCopy.type = true : errorCopy.type = false;
    !newTriggerFormLimit ? errorCopy.limit = true : errorCopy.limit = false;

    for(let key in errorCopy){
      if(errorCopy[key]){
        flag = false;
        break;
      }
    }

    if (flag) {
      addMyAlertTrigger();
    }else{
      setFormErrors(errorCopy);
    }
  }

  return(
    <Row className="currencyAlerts__new">
      <Col sm="12" className="currencyAlerts__new__form">
        <div className="currencyAlerts__new__form__wrapper">
          <p>Create new trigger</p>
          <fieldset>
            <label htmlFor="currencyAlertsNewFormSymbol">Trigger for symbol:</label>
            <input type="text" name="currencyAlertsNewFormSymbol" placeholder="Symbol name" className={formErrors.symbol ?  "input__border__fail" : ""} onChange={ (e) => changeTriggerFormValue('newTriggerFormSymbol', e.target.value)} value={ newTriggerFormSymbol } />

            <label htmlFor="currencyAlertsNewFormType">Trigger for bid/ask:</label>
            <select name="currencyAlertsNewFormType" id="currencyAlerts__new__form_type" className={formErrors.type ?  "input__border__fail" : ""} onChange={ (e) => changeTriggerFormValue('newTriggerFormListenType', e.target.value)} value={ newTriggerFormListenType } >
              <option value=""></option>
              <option value="bid">bid</option>
              <option value="ask">ask</option>
            </select>
          </fieldset>

          <fieldset>
            <label htmlFor="currencyAlertsNewFormLimit">Trigger activation value:</label>
            <input type="number" min={1} placeholder="In numbers" name="currencyAlertsNewFormLimit" className={formErrors.limit ?  "input__border__fail" : ""} onChange={ (e) => changeTriggerFormValue('newTriggerFormLimit', e.target.value)} value={ newTriggerFormLimit } />

            <label htmlFor="currencyAlertsNewFormProp">Trigger on fall/raise:</label>
            <select name="currencyAlertsNewFormProp" id="currencyAlerts__new__form_prop" className={formErrors.prop ?  "input__border__fail" : ""} onChange={ (e) => changeTriggerFormValue('newTriggerFormListenProp', e.target.value)} value={ newTriggerFormListenProp }>
              <option value=""></option>
              <option value="onFall">on fall</option>
              <option value="onRaise">on raise</option>
            </select>
            
          </fieldset>

          <div className="currencyAlerts__new__form__buttonWrapper">
            <button onClick={ handleCreate }>Create</button>
          </div>

          
        </div>
      </Col>
    </Row>
  )
}

export default observer(NewAlertTrigger);