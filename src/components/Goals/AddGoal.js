import React,{ useState } from 'react';
import { Button, Form } from "react-bootstrap"
import { useAuth } from '../../context/AuthContext'
import firebase from '../../firebase';

export default function AddGoal() {
    const [titulo, setTitulo] = useState("");
    const [custo, setCusto] = useState(0);
    const [pago, setPago] = useState(0);
    const { currentUser, logout } = useAuth();


    const addNewGoal = (e) => {
        e.preventDefault()
        const db = firebase.firestore()
        db.collection("goals").add({
            titulo: titulo,
            valorPago: +pago,
            valorTotal: +custo,
            userId: currentUser.uid
        })
        clearData();
    }

    const clearData = () => {
        setTitulo('');
        setCusto(0);
        setPago(0);
    }

    return(
        <Form className="goal-form p-3" onSubmit={addNewGoal}> 
            <h2 className="title-dash">Create Goal</h2>
            <Form.Group>
                <Form.Label >Goal Title</Form.Label>
                <Form.Control type="text" placeholder="Ex. New Car" value={titulo} onChange={(e) => setTitulo(e.target.value)}/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Cost</Form.Label>
                <Form.Control type="text" placeholder="Ex. 100.000€" value={custo} onChange={(e) => setCusto(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Paid</Form.Label>
                <Form.Control type="text" placeholder="Ex. 0" value={pago} onChange={(e) => setPago(e.target.value)}></Form.Control>
            </Form.Group>
            <Button type="submit" className="add-goal" onClick={addNewGoal} block>Add Goal</Button>
        </Form>
    );
}

