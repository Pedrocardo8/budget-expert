import React, { useState, useEffect } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import {Col,Table,Button, Modal, Form} from 'react-bootstrap';
import firebase from '../../firebase';



function TableRow({transaction, key} ){
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState('');

    const onDelete = () => {
        const db = firebase.firestore()        
        db.collection("transactions").where("amount", "==", transaction.amount).get()
        .then(querySnapshot => {
            querySnapshot.docs[0].ref.delete();
        });
      }

    const [show, setShow] = useState(false);
    const [addValue, setAddValue] = useState(0);

    const handleClose = () => {
        setShow(false);
    }
    const handleCloseSave = (e) => {
        e.preventDefault()

        const db = firebase.firestore()     
        /*db.collection("transactions").doc(doc.id).update({
            category:category,
            amount: +amount,
            description: description
        })*/
        db.collection("transactions").where("amount", "==", transaction.amount).get().then(querySnapshot => {
            querySnapshot.docs[0].ref.update({
                category:category,
                amount: +amount,
                description: description
            });
        })
        setShow(false);
    }
    const handleShow = () =>{
        setCategory(transaction.category)
        setAmount(transaction.amount)
        setDescription(transaction.description)
       setShow(true); 
    } 


    return(
        
            <tr className={transaction.amount < 0 ? 'minus' : 'plus'}>
                <td>{transaction.category}</td>
                <td>{transaction.amount}€</td>
                <td>{transaction.description}</td>
                <td>{new Date(transaction.created.seconds * 1000).toLocaleDateString("pt-PT")}</td>
                <td>            
                <IconButton aria-label="delete"  color="primary">
                    <DeleteIcon onClick={onDelete}/>
                </IconButton>
                <Fab color="primary" onClick={handleShow} aria-label="edit" size="small">
                    <EditIcon />
                </Fab>
                </td>
                
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Edit Category</Form.Label>
                                <Form.Control as="select"  value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option>{transaction.category}</option>
                                    <option>Food</option>
                                    <option>Shopping</option>
                                    <option>House</option>
                                    <option>Salary</option>
                                    <option>Investment</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Edit Amount</Form.Label>
                                <Form.Control type="text" placeholder={transaction.amount} value={amount} onChange={(e) => setAmount(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Edit Description</Form.Label>
                                <Form.Control type="text" placeholder={transaction.description}  value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
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
                
            </tr>
        
    );
}
export default TableRow;