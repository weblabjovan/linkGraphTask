import React from 'react';
import { observer } from 'mobx-react';
import { Row, Col, Table } from 'reactstrap';
import PaginationComponent from '../components/globals/PaginationComponent';
import { IStore } from '../interfaces/data';
import { StoreContext } from '../store';
import { unixToTimeString } from '../lib/helpers';

const CurrencyList = () => {
  const store: IStore = React.useContext(StoreContext);
  const { changeCurrencySearchField, movecurrencyListPage, sortCurrencyList, clearCurrencySearchField, currencyListPageSize, currencySearchField, currencyListPage, getCurrentPageList, getCurrencyListPageMax, currencySortProp, currencySortDirection } = store;
  const sortCaret = {column: currencySortProp, direction: currencySortDirection === "ASC" ? '\u02C6' : '\u02C7'};
  
  const list = getCurrentPageList;
  const pageMax = getCurrencyListPageMax;

  return(
    <React.Fragment>
      <Row className="currencyList">
        <Col sm="12"><h1 className="currencyList__title">Markets Info</h1></Col>
        <Col sm="12" className="currencyList__search">
          <input type="text" placeholder="Search by symbol" name="currencyListSearchField" className="currencyList__search__field" value={currencySearchField} onChange={(e) => changeCurrencySearchField(e.target.value) } />
          <button className="currencyList__search__clearButton" onClick={clearCurrencySearchField}>Clear</button>
        </Col>
        <Col sm="12" className="currencyList__table">
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th onClick={ () => sortCurrencyList('symbol') }>
                {sortCaret.column === 'symbol' ? <span className="currencyList__sortCaret">{sortCaret.direction}</span> : null }
                Symbol
              </th>
              <th onClick={ () => sortCurrencyList('currency') }>
                {sortCaret.column === 'currency' ? <span className="currencyList__sortCaret">{sortCaret.direction}</span> : null }
                Currency
              </th>
              <th onClick={ () => sortCurrencyList('bid') }>
                {sortCaret.column === 'bid' ? <span className="currencyList__sortCaret">{sortCaret.direction}</span> : null }
                Bid
              </th>
              <th onClick={ () => sortCurrencyList('ask') }>
                {sortCaret.column === 'ask' ? <span className="currencyList__sortCaret">{sortCaret.direction}</span> : null }
                Ask
              </th>
              <th onClick={ () => sortCurrencyList('latest_trade') }>
                {sortCaret.column === 'latest_trade' ? <span className="currencyList__sortCaret">{sortCaret.direction}</span> : null }
                Latest trade
              </th>
            </tr>
          </thead>
          <tbody>
            {
              list.map((item, index) => {
                return(
                  <tr key={`currencyListTableRowKey_${index}`}>
                    <th scope="row">{((currencyListPage - 1)* currencyListPageSize)  + (index+1)}</th>
                    <td>{item.symbol}</td>
                    <td>{item.currency}</td>
                    <td>{item.bid ? item.bid : 0}</td>
                    <td>{item.ask ? item.ask : 0}</td>
                    <td>{unixToTimeString(item.latest_trade)}</td>
                    
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
        </Col>
      </Row>
      <PaginationComponent maxPage={ pageMax } currentPage={ currencyListPage } pageChangeFunction={ movecurrencyListPage } />
    </React.Fragment>
    
  )
}

export default observer(CurrencyList);