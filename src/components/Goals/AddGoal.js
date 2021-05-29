import React,{ useState, useEffect } from 'react';
import { Button, Form } from "react-bootstrap"
import { useAuth } from '../../context/AuthContext'
import firebase from '../../firebase';

export default function AddGoal() {
    // criar variáveis para usar no controlo
    const [titulo, setTitulo] = useState("");
    const [custo, setCusto] = useState(0);
    const [pago, setPago] = useState(0);
    const { currentUser} = useAuth();
    const [showTitleError, setShowTitleError] = useState(false);
    const [showTotalValueError, setShowTotalValueError] = useState(false);
    const [showPaidError, setShowPaidError] = useState(false);
    const [goals, setGoals] = useState([]);

    // vai buscar todas os objetivos adicionados anteriormente
    useEffect(() => {
        var user = firebase.auth().currentUser;
        const ref = firebase.firestore().collection("goals").where("userId", "==", user.uid)
        ref.onSnapshot((querySnapchot) => {
            const items = [];
            querySnapchot.forEach((doc) => {
                items.push(doc.data())
            });
            setGoals(items);
        })
    }, []);



    // adicionar novo objetivo
    const addNewGoal = (e) => {
        e.preventDefault()
        setShowTitleError(false);
        setShowTotalValueError(false);
        setShowPaidError(false);
        let x = true;
        for(let i = 0; i < goals.length; i++) {
            if(goals[i].titulo === titulo){x = false;}
        };
        if(x && titulo !== "" && parseInt(custo) > 0 && parseInt(custo) > parseInt(pago)) {
            const db = firebase.firestore()
            db.collection("goals").add({
                titulo: titulo,
                valorPago: +pago,
                valorTotal: +custo,
                userId: currentUser.uid
            })
            clearData();
        }
        if(titulo === 0) {setShowTitleError(true);}
        if(parseInt(pago) <= 0) {setShowTotalValueError(true);}
        if(parseInt(custo) <= parseInt(pago)) {setShowPaidError(true);}
    }

    // limpar dados
    const clearData = () => {
        setTitulo('');
        setCusto(0);
        setPago(0);
    }

    return(
        <Form className="goal-form p-3" onSubmit={addNewGoal}> 
            <h2 className="title-dash text-center">Create Goal</h2>
            <Form.Group>
                <Form.Label >Goal Title</Form.Label>
                <Form.Control type="text" placeholder="Ex. New Car" value={titulo} onChange={(e) => setTitulo(e.target.value)}/>
                <span style={{ display: showTitleError ? "block" : "none"}} className="error">Insert valid goal title</span>
            </Form.Group>

            <Form.Group>
                <Form.Label>Cost</Form.Label>
                <Form.Control type="text" placeholder="Ex. 100.000€" value={custo} onChange={(e) => setCusto(e.target.value)}></Form.Control>
                <span style={{ display: showTotalValueError ? "block" : "none"}} className="error">Insert valid cost</span>
            </Form.Group>
            <Form.Group>
                <Form.Label>Paid</Form.Label>
                <Form.Control type="text" placeholder="Ex. 0" value={pago} onChange={(e) => setPago(e.target.value)}></Form.Control>
                <span style={{ display: showPaidError ? "block" : "none"}} className="error">Paid value is equal or bigger than the cost</span>
            </Form.Group>
            <Button type="submit" className="add-goal" onClick={addNewGoal} block>Add Goal</Button>
        </Form>
    );
}

