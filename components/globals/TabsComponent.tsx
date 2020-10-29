import React from 'react';
import { Row, Col } from 'reactstrap';
import { ITabsComponent } from '../../interfaces/components';

const TabsComponent = (props: {tabs: Array<ITabsComponent>, activeTab: string, changeTab(name: string): void}) => {
  const { tabs, activeTab, changeTab  } = props;
  
  return (
    <Row className="tabs">
      {
        tabs.map((item, index) => {
          return(
            <Col sm="2" key={`tabsComponentKey_${index}`} className="grid__column__smallPading">
              <div className={`tabs__item ${activeTab === item.id ? 'tabs__item__active' : ''}`} onClick={ () => changeTab(item.id)}>
                <h6 className="tabs__title">{item.name}</h6>
              </div>
            </Col>
          )
        })
      }
    </Row>
  )
}

export default TabsComponent;