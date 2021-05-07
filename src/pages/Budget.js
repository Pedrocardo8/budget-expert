import React from 'react'
import {
    Container,
    Row,
    Col
  } from "react-bootstrap";
import BudgetList from '../components/Budget/BudgetList';
import AddBudget from '../components/Budget/AddBudget';

function Budget() {
    return (
        <div className='dash mt-5'>
            <Container>
            <Row>
                <Col>
                    <BudgetList />
                </Col>
                <Col>
                    <AddBudget />
                </Col>

            </Row>
            </Container>
        </div>
    )
}

export default Budget;
