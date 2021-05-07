import React , { useState, useContext } from 'react';
import { Form, Button } from "react-bootstrap"
import { useAuth } from '../../context/AuthContext'
import firebase from '../../firebase';


const Add = () => {
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState('');    
    const { currentUser, logout } = useAuth()
    const [type, setType] = useState('');

    const addNewTransaction = (e) => {
        e.preventDefault()
        const db = firebase.firestore()
        db.collection("transactions").add({
            category:category,
            amount: (type === '+' ? +amount : -amount) ,
            description: description,
            userId: currentUser.uid,
            created: firebase.firestore.Timestamp.fromDate(new Date())
        })
        setCategory('')
        setAmount(0)
        setDescription('')
    }

    return (
        <div>
            <Form onSubmit={addNewTransaction}>
                <h2>Add new :</h2>
                
                <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Type</Form.Label>
                <Form.Control as="select" className="my-1 mr-sm-2" value={type} onChange={(e) => setType(e.target.value)}>                         
                    <option value="0">Choose...</option>
                    <option value="+">Income</option>
                    <option value="-">Expense</option>
                </Form.Control>
                </Form.Group>
                
                
                
                <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Category</Form.Label>
                <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>-</option>
                <option>Food</option>
                <option>Shopping</option>
                <option>House</option>
                <option>Salary</option>
                <option>Investment</option>
                </Form.Control>
                </Form.Group>
                <Form.Group>
                <Form.Label >Amount</Form.Label>
                <Form.Control type="text" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={2} value={description} onChange={(e) => setDescription(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit" block >Add</Button>                                        
            </Form>
        </div>
    )
}

export default Add;


