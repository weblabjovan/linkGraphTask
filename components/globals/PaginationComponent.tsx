import React from 'react';
import { Row, Col } from 'reactstrap';

const PaginationComponent = React.memo((props: {currentPage: number, maxPage: number, pageChangeFunction(prop: string): void}) => {
  const { currentPage, maxPage, pageChangeFunction  } = props;

  return (
    <Row className="pagination">
      <Col sm="3" className="pagination__break"></Col>
      <Col sm="2" className="pagination__control">
        <button className="pagination__button" disabled={ currentPage - 1 < 1 } onClick={() => pageChangeFunction('prev')}>Prev</button>
      </Col>
      <Col sm="2" className="pagination__control">
        <p className="paggination__number">{`Page ${currentPage} of ${maxPage}`}</p>
      </Col>
      <Col sm="2" className="pagination__control">
        <button className="pagination__button" disabled={ currentPage + 1 > maxPage } onClick={() => pageChangeFunction('next')}>Next</button>
      </Col>
      <Col sm="3" className="pagination__break"></Col>
    </Row>
  )
})

export default PaginationComponent;