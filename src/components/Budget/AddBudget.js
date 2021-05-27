import { TrainOutlined } from '@material-ui/icons';
import React , { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import { useAuth } from '../../context/AuthContext'
import firebase from '../../firebase';


const AddBudget = () => {
    // criar variáveis para usar no controlo
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [amount, setAmount] = useState(0);
    const [progress, setProgress] = useState(0);
    const { currentUser, logout } = useAuth();
    const [showCategoryError, setCategoryError] = useState(false);
    const [showAmountError, setAmountError] = useState(false);
    const [budgets, setBudgets] = useState([]);

    // vai buuscar todas as categorias e budgets inseridos anteriormente
    React.useEffect(() => {
        var user = firebase.auth().currentUser;
        const ref = firebase.firestore().collection("categories").where("userId", "==", user.uid)
        ref.onSnapshot((querySnapchot) => {
            const items = [];
            querySnapchot.forEach((doc) => {
                items.push(doc.data())
            });
            setCategories(items);
        })
    }, []);

    React.useEffect(() => {
        var user = firebase.auth().currentUser;
        const ref = firebase.firestore().collection("budgets").where("userId", "==", user.uid)
        ref.onSnapshot((querySnapchot) => {
            const items = [];
            querySnapchot.forEach((doc) => {
                items.push(doc.data())
            });
            setBudgets(items);
        })
    }, []);

    // Adiciona budget
    const addBudget = (e) => {
        e.preventDefault();
        let x = true;
        setCategoryError(false);
        setAmountError(false);
        for(let i = 0; i < budgets.length; i++) {
            if(budgets[i].category == category) {
                x = false;
            }
        }
        console.log(x);
        if (category !== "" && amount !== 0 && x){
            const db = firebase.firestore()
            db.collection("budgets").add({
                category:category,
                amount: +amount,            
                userId: currentUser.uid,
                progress: progress,
                created: firebase.firestore.Timestamp.now()
            })
            // limpa os valores dos inputs
            setCategory('')
            setAmount(0) 
        }
        if(category == "") {setCategoryError(true)}
        if(amount == 0) {setAmountError(true)}
               
    }

    

    return (
        <div>
                <Form onSubmit={addBudget}>
                <h2 className='text-center title-dash'>Create Budget</h2>
                <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Category</Form.Label>
                <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="0">Choose...</option>
                    {categories.map(opt => (
                        <option value={opt.titulo}>{opt.titulo}</option>
                    ))}
                </Form.Control>
                <span style={{ display: showCategoryError ? "block" : "none"}} className="error">Choose a category</span>
                </Form.Group>
                <Form.Group>
                <Form.Label>Amount</Form.Label>
                <Form.Control type="text" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)}/>
                <span style={{ display: showAmountError ? "block" : "none"}} className="error">Choose an amount</span>
                </Form.Group>
                <Button variant="primary" type="submit" block>Add Budget</Button>                                        
            </Form>
        </div>
    )
}

export default AddBudget;
