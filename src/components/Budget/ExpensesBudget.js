import React, { useState, useEffect } from 'react';
import { ProgressBar, Container, Row, Col, Modal, Form, Button } from 'react-bootstrap';
import firebase from '../../firebase';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';

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
        })

    }, []);


    const [amount, setAmount] = useState(0);

    //editar budget
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }
    const handleCloseSave = (e) => {
        e.preventDefault()
        var user = firebase.auth().currentUser;
        const db = firebase.firestore()    
        
        db.collection("budgets").where("category", "==", 'Expenses').where("userId", "==", user.uid).get().then(querySnapshot => {
            querySnapshot.docs[0].ref.update({
                amount: +amount,               
            });
        })
        setShow(false);
    }
    const handleShow = () =>{
        setAmount(budget.amount)        
        setShow(true); 
    } 
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
                    <Col>                  
                        <Fab color="primary" onClick={handleShow} aria-label="edit" size="small">
                            <EditIcon />
                        </Fab>
                    </Col>                
                </Row>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>                      

                        <Form >
                            <h2 className='text-center title-dash'>Edit Month Limit</h2>
                            <Form.Group>
                                <Form.Label>Amount</Form.Label>
                                <Form.Control type="text" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)}/>
                            </Form.Group>
                            <Form.Group>
                                <Button variant="secondary mr-3" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleCloseSave}>
                                    Save Changes
                                </Button>
                            </Form.Group>
                        </Form>

                    </Modal.Body>
                </Modal>
            </Container>
            
        </div>
    )
}

export default ExpensesBudget;
