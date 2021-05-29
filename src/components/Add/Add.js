import React , { useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap"
import { useAuth } from '../../context/AuthContext'
import firebase from '../../firebase';



const Add = () => {
    // criar variáveis para usar no controlo
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState('');    
    const { currentUser} = useAuth()
    const [type, setType] = useState('');
    const [showCategoryError, setCategoryError] = useState(false);
    const [showAmountError, setAmountError] = useState(false);
    const [showDescriptionError, setDescriptionError] = useState(false);

    // Vai buscar todas as categorias que foram criadas anteriormente
    useEffect(() => {
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

    
    // adiciona uma nova transação
    const addNewTransaction = (e) => {
        e.preventDefault()
        setCategoryError(false);
        setAmountError(false);
        setDescriptionError(false);
        // adiciona a transação à bd
        if(category !== "" && amount !== 0 && description !== ""){
            const db = firebase.firestore()
            db.collection("transactions").add({
                category:category,
                amount: (type === '+' ? +amount : -amount) ,
                description: description,
                userId: currentUser.uid,
                created: firebase.firestore.Timestamp.fromDate(new Date())
            })
            // repõe os valores dos inputs
            setCategory('')
            setAmount(0)
            setDescription('')
        }
        // adiciona uma span de erro, se houver erro
        if (category === ""){
            setCategoryError(true);
        }
        if(amount === 0){
            setAmountError(true);
        }
        if(description === "") {
            setDescriptionError(true);
        }
    }

    return (
        <div>
            <Form onSubmit={addNewTransaction}>
                <h2 className='text-center title-dash'>Add new Transaction</h2>
                
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
                    <option value="0">Choose...</option>
                    {categories.map(opt => (
                        <option value={opt.titulo}>{opt.titulo}</option>
                    ))}
                </Form.Control>
                <span style={{ display: showCategoryError ? "block" : "none"}} className="error">Choose a category</span>
                </Form.Group>
                <Form.Group>
                <Form.Label >Amount</Form.Label>
                <Form.Control type="text" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)}/>
                <span style={{ display: showAmountError ? "block" : "none"}} className="error">Choose an amount</span>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={2} value={description} onChange={(e) => setDescription(e.target.value)}/>
                <span style={{ display: showDescriptionError ? "block" : "none"}} className="error">Choose a description</span>
                </Form.Group>
                <Button variant="primary" type="submit" block >Add</Button>                                        
            </Form>
        </div>
    )
}

export default Add;


