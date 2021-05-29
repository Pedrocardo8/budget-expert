import React, { useState, useEffect } from 'react';
import { ProgressBar, Container, Row, Col } from 'react-bootstrap';
import firebase from '../../firebase';

function ExpensesBudget( { budget } )  {
    // definir todas as variáveis necessárias para o componente
    const[categoryTransactions, setCategoryTransactions] = useState([]);

    const amounts = categoryTransactions.map(transaction => transaction.amount);
    const expense = (amounts.filter(item => item < 0 ).reduce((acc, item) => (acc += item), 0) * -1);
    const progress = (expense/budget.amount)*100;
    let monthNumber = (new Date().getMonth());
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthName = monthNames[monthNumber];

    // vai buscar todas as transações 
    useEffect(() => {
        var user = firebase.auth().currentUser;
        const ref = firebase.firestore().collection("transactions").where("userId", "==", user.uid)
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
                    <Col>
                        <h3 className="text-white">{budget.category} for {monthName}</h3>
                        <ProgressBar variant={progress < 80 ? 'success' : 'danger'} now={progress} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="text-white align-center">Current:{expense} Limit: {budget.amount}</p>                 

                    </Col>                
                </Row>
            </Container>
            
        </div>
    )
}

export default ExpensesBudget;
