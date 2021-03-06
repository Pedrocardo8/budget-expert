import React, { useState } from 'react'
import { Button, Modal, Form, Col } from "react-bootstrap"
import firebase from '../../firebase';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import Chart from "react-google-charts"


export default function GoalLine({goal, key}) {
    const [show, setShow] = useState(false);
    const [titulo, setTitulo] = useState(goal.titulo);
    const [valorPago, setValorPago] = useState(goal.valorPago);
    const [valorTotal, setValorTotal] = useState(goal.valorTotal);
    const [addValue, setAddValue] = useState(0);
    const [showUnder, setShowUnder] = useState(false);

    const showUnderFunction = () => {
        setShowUnder(!showUnder);
    }

    const addClose = () => {
        setShow(false);
    }

    const handleClose = () => {
        setShow(false);
    }
    const addCloseSave = (e) => {
        e.preventDefault()
        if(parseInt(addValue) + parseInt(goal.valorPago) > goal.valorTotal){
            setShow(false);
        }
        else {
            const db = firebase.firestore()
            db.collection("goals").where("titulo", "==", goal.titulo).where("valorTotal", "==", goal.valorTotal).get().then(querySnapshot => {
                querySnapshot.docs[0].ref.update({
                    valorPago: Number(addValue) + Number(goal.valorPago)
                });
            })
            setShow(false);
        } 
    }
    const addShow = () => setShow(true);

    const deleteGoal = () => {
        const db = firebase.firestore()
        db.collection("goals").where("titulo", "==", goal.titulo).get().then(querySnapshot => {
            querySnapshot.docs[0].ref.delete();
        })
    }

    const editGoal = (e) => {
        e.preventDefault();
        const db = firebase.firestore()
        db.collection("goals").where("titulo", "==", goal.titulo).where("valorTotal", "==", goal.valorTotal).get().then(querySnapshot => {
            querySnapshot.docs[0].ref.update({
                titulo: titulo,
                valorPago: valorPago,
                valorTotal: valorTotal
            });
        })
        setShowUnder(false);
    }


    return(
        <div className="border border-secondary rounded m-3">
            <Col>
            <h2 className="text-center">{goal.titulo}</h2>
            <Chart
                        width={'446'}
                        height={'300px'}
                        align={'left'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Task', 'Hours per Day'],
                            ['Paid', goal.valorPago],
                            ['Left', goal.valorTotal - goal.valorPago], 
                        ]}
                        options={{
                            fontSize: '15',
                            responsive: true,
                            titleTextStyle: { color: '#000' },
                            legendTextStyle: { color: '#000' },
                            maintainAspectRatio: false,
                            //backgroundColor:"#0a2963"
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />  
            <div className="d-flex">
                <Button variant="outline-primary mt-2 mr-1" className="add-goal" onClick={addShow}>Add Income</Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>{goal.titulo}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Paid: {goal.valorPago}</Form.Label>
                                    <p>Amount to be added to the amount already paid</p>
                                    <Form.Control type="number" placeholder="Valor a somar ao valor atualmente pago" onChange={(e) => setAddValue(e.target.value)}></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Button variant="secondary mr-3" onClick={addClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={addCloseSave}>
                                        Save Changes
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                    </Modal>

                <Button variant="outline-secondary mt-2 mr-2" className="add-goal" onClick={showUnderFunction}>Edit Goal</Button>
                <IconButton aria-label="delete"  color="primary">
                    <DeleteIcon onClick={deleteGoal}/>
                </IconButton>
                
               
                </div>  
                <div style={{display: showUnder ? 'block' : 'none' }}>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Goal Title</Form.Label>
                                    <Form.Control type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)}></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Total Value</Form.Label>
                                    <Form.Control type="number" value={valorTotal} onChange={(e) => setValorTotal(e.target.value)}></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Button variant="primary" onClick={editGoal}>
                                        Save Changes
                                    </Button>
                                </Form.Group>
                            </Form>
                </div>    
            </Col>
        </div>
      
    );
}