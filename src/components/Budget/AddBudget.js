import React , { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import { useAuth } from '../../context/AuthContext'
import firebase from '../../firebase';


const AddBudget = () => {
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [amount, setAmount] = useState(0);
    const [progress, setProgress] = useState(0);
    const { currentUser, logout } = useAuth();

    const addBudget = (e) => {
        e.preventDefault()
        const db = firebase.firestore()
        db.collection("budgets").add({
            category:category,
            amount: +amount,            
            userId: currentUser.uid,
            progress: progress,
            created: firebase.firestore.Timestamp.now()
        })
        setCategory('')
        setAmount(0)        
    }

    React.useEffect(() => {
        var user = firebase.auth().currentUser;
        const ref = firebase.firestore().collection("categories").where("userId", "==", user.uid)
        ref.onSnapshot((querySnapchot) => {
            const items = [];
            querySnapchot.forEach((doc) => {
                items.push(doc.data())
            });
            console.log(items);
            setCategories(items);
        })
    }, []);

    return (
        <div>
                <Form onSubmit={addBudget}>
                <h2>Create Budget</h2>
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
                <Button variant="primary" type="submit" block>Add Budget</Button>                                        
            </Form>
        </div>
    )
}

export default AddBudget;
