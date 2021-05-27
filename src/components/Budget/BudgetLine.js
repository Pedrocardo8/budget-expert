import React, { useState, useEffect } from 'react';
import { ProgressBar, Container, Row, Col,Button, Modal, Form } from 'react-bootstrap';
import firebase from '../../firebase';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';

function BudgetLine( { budget } )  {
    const[categoryTransactions, setCategoryTransactions] = useState([]);
    const [categories, setCategories] = useState([]);

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
            
        })

        const search = firebase.firestore().collection("categories").where("userId", "==", user.uid)
        search.onSnapshot((querySnapchot) => {
            const result = [];
            querySnapchot.forEach((doc) => {
                result.push(doc.data())
            });
            setCategories(result);
        })

    }, []);

    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState('');

    const onDelete = () => {
        const db = firebase.firestore()        
        db.collection("budgets").where("category", "==", budget.category).get()
        .then(querySnapshot => {
            querySnapshot.docs[0].ref.delete();
        });
      }
    //editar
    const [show, setShow] = useState(false);
    const [addValue, setAddValue] = useState(0);

    const handleClose = () => {
        setShow(false);
    }
    const handleCloseSave = (e) => {
        e.preventDefault()

        const db = firebase.firestore()    
        
        db.collection("budgets").where("category", "==", budget.category).get().then(querySnapshot => {
            querySnapshot.docs[0].ref.update({
                category:category,
                amount: +amount,               
            });
        })
        setShow(false);
    }
    const handleShow = () =>{
        setCategory(budget.category)
        setAmount(budget.amount)        
       setShow(true); 
    } 


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
                        <IconButton aria-label="delete"  color="primary">
                            <DeleteIcon onClick={onDelete}/>
                        </IconButton>
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
                            <h2 className='text-center title-dash'>Edit Budget</h2>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Category</Form.Label>
                                <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option value="0">Choose...</option>
                                    {categories.map(opt => (
                                        <option value={opt.titulo}>{opt.titulo}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
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
                <hr></hr>
            </Container>
            
        </div>
    )
}

export default BudgetLine;
