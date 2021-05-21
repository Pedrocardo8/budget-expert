import React, { useState, useEffect } from 'react';
import { ProgressBar, Container, Row, Col } from 'react-bootstrap';
import firebase from '../../firebase';

function BudgetLine( { budget } )  {
    const[categoryTransactions, setCategoryTransactions] = useState([]);

    const amounts = categoryTransactions.map(transaction => transaction.amount);
    const expense = (amounts.filter(item => item < 0 ).reduce((acc, item) => (acc += item), 0) * -1);
    const progress = (expense/budget.amount)*100;
    

    useEffect(() => {
        var user = firebase.auth().currentUser;
        const ref = firebase.firestore().collection("transactions").where("userId", "==", user.uid).where("category", "==", budget.category)       
        ref.onSnapshot((querySnapchot) => {
            const items = [];
            querySnapchot.forEach((doc) => {
                items.push(doc.data())
            });
            setCategoryTransactions(items);
            console.log(categoryTransactions)
            
            
        })

    }, []);


    return (
        <div>
            <Container>
                <Row>
                    <Col xs={8} md={8} lg={8}>
                        <h3>{budget.category}</h3>
                        <ProgressBar variant={progress < 80 ? 'success' : 'danger'} now={progress} />
                    </Col>
                    <Col>
                        <p className="text-danger">Limit: {budget.amount}</p>
                    </Col>
                </Row>
            </Container>
            
        </div>
    )
}

export default BudgetLine;
